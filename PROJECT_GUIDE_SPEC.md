# Build Guide Spec (Astro + MDX, “single-source with per-variant pages”)

This spec defines how we author and render electronics build guides in Astro using **one MDX file per project**, with **static pages for each variant** derived from frontmatter. It focuses on **Option A** (MDX `components` mapping) to pass context (variant features, tag filters) into components at build time—no hydration required.

It stands alone and does **not** assume prior context.

---

## Goals & rationale

* **Author-first**: Writers use a single MDX file with readable shortcodes (e.g., `<BuildStep>`, `<LearnStep>`, `<Callout>`, `<If>`).
* **Single source of truth**: One MDX file drives both the **root (variantless)** page and **all variant** pages.
* **Static output**: All pages are pre-rendered; no client JS unless we add optional interactivity later.
* **Composable UI**: Layout/markup live in Astro components; we can redesign once and all guides update.
* **Minimal schema**: Keep existing schema properties; add only what we need for variants. Existing “variant config” is **superseded** by the new one (no back-compat required).
* **Flexibility**: Projects can be showcases (no steps/variants) or full guides (steps, callouts, conditionals).

---

## Content model

**Collection name:** `projects`
**File location for a guide:** `src/content/projects/<slug>/index.mdx`
**Assets:** co-locate with the MDX (e.g., images alongside `index.mdx`).

### Frontmatter (minimal)

Frontmatter in `index.mdx` MAY include:

```yaml
title: "Red Monkey"
projectId: "red-monkey-v1"
variants:
  - slug: "full"
    label: "Full DIY"
    features: { premountedResistor: false, premountedMCU: false }
    includeTags: ["diy"]           # optional
    excludeTags: ["premounted"]    # optional
  - slug: "premounted"
    label: "Premounted MCU + Resistor"
    features: { premountedResistor: true, premountedMCU: true }
    excludeTags: ["diy"]           # optional
```

**Notes**

* `variants` is **optional**. If omitted, only the root page is rendered.
* Fields not listed here that already exist in our schema should remain available (we keep them intact).
* The legacy variant config is replaced by `variants` above.

### Content collections config (schema sketch)

```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    projectId: z.string().optional(),
    variants: z.array(z.object({
      slug: z.string(),
      label: z.string(),
      features: z.record(z.boolean()).default({}),
      includeTags: z.array(z.string()).optional(),
      excludeTags: z.array(z.string()).optional(),
    })).optional(),
    // Keep existing properties around (not listed here).
  }),
});

export const collections = { projects };
```

---

## Authoring in MDX

Authors write one MDX file that can render both:

* a **root (variantless) view** (e.g., a variant selector or marketing blurb), and
* **variant views** (actual build steps).

We expose lightweight components:

* `<Guide>`: top-level wrapper (visual/container).
* `<BuildStep id title tags?>…</BuildStep>`: actionable steps.
* `<LearnStep id title>…</LearnStep>`: educational content.
* `<Callout type="info|warning|danger">…</Callout>`
* `<StepImage src alt width?>`
* `<If has="flag" />` / `<If not="flag" />`: conditional rendering on feature flags.
* `<If root>` / `<If variant>`: conditional rendering based on context (see below).

> All props are optional unless noted. `tags` is used for include/exclude filtering per variant.

### Example `src/content/projects/red-monkey/index.mdx`

```mdx
---
title: "Red Monkey"
projectId: "red-monkey-v1"
variants:
  - slug: "full"
    label: "Full DIY"
    features: { premountedResistor: false, premountedMCU: false }
    includeTags: ["diy"]
  - slug: "premounted"
    label: "Premounted MCU + Resistor"
    features: { premountedResistor: true, premountedMCU: true }
    excludeTags: ["diy"]
---

import { Guide, BuildStep, LearnStep, Callout, StepImage, If } from "@/components/guide";

<Guide>

  {/* Root-only content: render a selector, intro, etc. */}
  <If root>
    <h1>Red Monkey</h1>
    <p>Select your kit version to start building.</p>
    {/* We *could* render a selector here (links come from the page, see routing). */}
  </If>

  {/* Variant-only content: the actual guide */}
  <If variant>
    <BuildStep id="prep" title="Unpack the bag" tags={["diy"]}>
      <Callout type="info">Keep small parts organized.</Callout>
    </BuildStep>

    <If not="premountedResistor">
      <BuildStep id="r1" title="Solder the 1k resistor" tags={["diy","resistor"]}>
        <StepImage src={"./0805-resistor.jpg"} alt="0805 resistor on pads" />
        Place the **1k** resistor at R1. Orientation does not matter.
      </BuildStep>
    </If>

    <If not="premountedMCU">
      <BuildStep id="mcu" title="Solder the MCU" tags={["diy","mcu"]}>
        Align the dot with pin 1.
      </BuildStep>
    </If>

    <LearnStep id="why-resistor" title="Why R1?">
      The resistor limits current through the LED (Ohm’s law).
    </LearnStep>

    <BuildStep id="test" title="Power-on test">
      Plug in power; the LED should blink.
    </BuildStep>
  </If>

</Guide>
```

---

## Rendering & routing

We render **three** kinds of pages from the same MDX file:

1. **Root (variantless)**: `/projects/<project>/`
2. **Per-variant**: `/projects/<project>/<variant>/`
3. (Optional) Index/list page for all projects—out of scope here.

### Files

```
src/
  content/
    projects/
      red-monkey/
        index.mdx
        0805-resistor.jpg
  components/guide/
    Guide.astro
    BuildStep.astro
    LearnStep.astro
    Callout.astro
    StepImage.astro
    If.astro
  pages/
    projects/
      [project]/index.astro        # root page (variantless)
      [project]/[variant].astro    # per-variant pages
```

### Root page (`[project]/index.astro`)

* Imports the MDX and renders it with **root context** (no variant).
* Also renders a simple **variant selector** if `variants` exist (links).
* Passes context via MDX `components` mapping (Option A).

```astro
---
import { getCollection } from "astro:content";
import MDXContent from "../../../content/projects/[project]/index.mdx";
import * as GuideComponents from "@/components/guide"; // {Guide, BuildStep, ...}

export async function getStaticPaths() {
  const all = await getCollection("projects");
  return all.map(entry => ({ params: { project: entry.slug }, props: { entry } }));
}

const { entry } = Astro.props;
const variants = entry.data.variants ?? [];

// Context for root page
const ctx = {
  isRoot: true,
  isVariant: false,
  features: {},                  // empty features
  includeTags: null,
  excludeTags: null,
};

// Wrap component exports to inject ctx
const components = Object.fromEntries(
  Object.entries(GuideComponents).map(([name, C]) => [name, (props) => <C {...props} {...ctx} />])
);
---

{variants.length > 0 && (
  <nav class="my-6">
    <h2>Choose a variant</h2>
    <ul>
      {variants.map(v => (
        <li><a href={`/projects/${entry.slug}/${v.slug}`}>{v.label}</a></li>
      ))}
    </ul>
  </nav>
)}

<MDXContent components={components} />
```

### Variant page (`[project]/[variant].astro`)

* Emits a page per variant.
* Passes variant context (features, tag filters) into all guide components via mapping.

```astro
---
import { getCollection } from "astro:content";
import MDXContent from "../../../content/projects/[project]/index.mdx";
import * as GuideComponents from "@/components/guide";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  const paths = [];
  for (const p of projects) {
    for (const v of (p.data.variants ?? [])) {
      paths.push({ params: { project: p.slug, variant: v.slug }, props: { entry: p, variant: v }});
    }
  }
  return paths;
}

const { entry, variant } = Astro.props;
const ctx = {
  isRoot: false,
  isVariant: true,
  features: variant.features ?? {},
  includeTags: variant.includeTags ?? null,
  excludeTags: variant.excludeTags ?? null,
};

const components = Object.fromEntries(
  Object.entries(GuideComponents).map(([name, C]) => [name, (props) => <C {...props} {...ctx} />])
);
---

<h1>{entry.data.title} — {variant.label}</h1>
<MDXContent components={components} />
```

---

## Component contracts (API)

All guide components accept the **injected context** props below. Authors never need to type them; the pages inject them using the `components` mapping.

### Context shape (injected)

```ts
type GuideContext = {
  isRoot: boolean;             // true on /projects/<project>/
  isVariant: boolean;          // true on /projects/<project>/<variant>/
  features: Record<string, boolean>;
  includeTags: string[] | null;
  excludeTags: string[] | null;
};
```

### `<Guide>` (layout wrapper)

* Purpose: provides consistent spacing/typography; may set page anchors, ToC, etc.
* Props: (author) none required.
* Uses injected context for styling or headers if desired.

```astro
---
// src/components/guide/Guide.astro
const ctx = Astro.props as any; // contains GuideContext
---
<div class="prose max-w-none">
  <slot />
</div>
```

### `<If>` (conditional blocks)

* Props:

  * `has?: string` — render if `features[has] === true`
  * `not?: string` — render if `features[not] !== true`
  * `root?: boolean` — render only on root
  * `variant?: boolean` — render only on variant pages
* Behavior: all provided conditions must pass.

```astro
---
// src/components/guide/If.astro
const { has, not, root, variant, features = {}, isRoot = false, isVariant = false } = Astro.props;

const byFeature =
  (has ? !!features[has] : true) &&
  (not ? !features[not] : true);

const byKind =
  (root ? isRoot : true) &&
  (variant ? isVariant : true);

if (!(byFeature && byKind)) return;
---
<slot />
```

### `<BuildStep>` & `<LearnStep>`

* Props:

  * `id: string` (recommended, for anchors)
  * `title: string`
  * `tags?: string[]` (optional filtering)
* Filtering: If `includeTags` is set, step renders only if it shares at least one tag; if `excludeTags` is set, step is hidden if any tag matches.

```astro
---
// src/components/guide/BuildStep.astro
const { id, title, tags = [], includeTags = null, excludeTags = null } = Astro.props;

const includePass = includeTags ? tags.some(t => includeTags.includes(t)) : true;
const excludePass = excludeTags ? !tags.some(t => excludeTags.includes(t)) : true;
if (!(includePass && excludePass)) return;
---
<section id={id} class="rounded-2xl border p-4 my-6">
  <header class="mb-2">
    <h3 class="m-0 text-lg font-semibold">🔧 {title}</h3>
  </header>
  <div><slot /></div>
</section>
```

`LearnStep.astro` mirrors `BuildStep.astro` but may use a different style (e.g., subtle background).

### `<Callout>`

* Props: `type?: "info" | "warning" | "danger"` (default `info`)

```astro
---
const { type = "info" } = Astro.props;
const cls = {
  info: "border-blue-300 bg-blue-50",
  warning: "border-amber-300 bg-amber-50",
  danger: "border-red-300 bg-red-50",
}[type] || "border-blue-300 bg-blue-50";
---
<div class={`my-3 rounded-xl border p-3 ${cls}`}>
  <slot />
</div>
```

### `<StepImage>`

* Props: `src` (string or imported), `alt?: string`, `width?: number = 960`

```astro
---
const { src, alt = "", width = 960 } = Astro.props;
---
<figure class="my-4">
  <img src={src} alt={alt} width={width} />
  {alt && <figcaption class="text-sm opacity-70">{alt}</figcaption>}
</figure>
```

### Barrel export

```ts
// src/components/guide/index.ts
export { default as Guide } from "./Guide.astro";
export { default as If } from "./If.astro";
export { default as BuildStep } from "./BuildStep.astro";
export { default as LearnStep } from "./LearnStep.astro";
export { default as Callout } from "./Callout.astro";
export { default as StepImage } from "./StepImage.astro";
```

---

## How context is passed (Option A)

* Each page (`index.astro` for root, `[variant].astro` for variants) **imports the MDX** and a set of components.
* It builds a `components` map where every component is wrapped to automatically receive the **same injected context** (`isRoot`, `isVariant`, `features`, `includeTags`, `excludeTags`).
* The MDX renders with `<MDXContent components={components} />`.
* Authors don’t pass context props by hand; they only write the semantic components.

**Why Option A?**

* Pure Astro; no client frameworks or hydration required.
* Centralized context; easy to change without touching authored MDX.
* Simple mental model for authors (“these tags exist; they just work”).

---

## Variant selector

* Shown on the **root page** (if variants exist).
* Implemented in `[project]/index.astro` (outside MDX) so links are always correct and crawlable.
* Authors may additionally show root-only content inside MDX via `<If root>`.

---

## Optional behaviors

* **Auto-number steps**: add a wrapper `<Steps>` that numbers visible `BuildStep` children at render time.
* **Shared partials**: create reusable MDX snippets and import them in guides.
* **Print view**: support a `?print=1` query with a print stylesheet.
* **Per-variant header**: `[variant].astro` adds `<h1>{title} — {variant.label}</h1>`; tweak as desired.

---

## Edge cases

* **No variants, but steps present**: root page shows the guide content (use `<If variant>` sparingly; or omit and just write steps).
* **Showcase projects** (no steps/variants): root page renders whatever the MDX contains; variant routes won’t exist.
* **Tag filters only**: omit `<If has/not>` and rely on tags + per-variant include/exclude.

---

## Acceptance checklist

* [ ] A single MDX at `src/content/projects/<slug>/index.mdx` renders both root and variant pages.
* [ ] Root at `/projects/<slug>/` builds successfully even with no variants.
* [ ] Variant pages at `/projects/<slug>/<variant>/` are generated for each frontmatter variant.
* [ ] Components receive injected context via the MDX `components` mapping.
* [ ] `<If root>` and `<If variant>` conditionals work as expected.
* [ ] Tag filtering (`includeTags`/`excludeTags`) hides/shows steps correctly.
* [ ] No client hydration is required for the base experience.

---

## Maintenance notes

* Keep existing schema properties; introduce only the minimal `variants` block shown above. The previous variant mechanism is superseded and can be removed from code paths.
* All visual changes are centralized in `src/components/guide/*`, keeping authored MDX stable over time.
