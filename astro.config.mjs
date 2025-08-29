// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Hackheim",
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: true,
      },
      sidebar: [
        {
          label: "Intro",
          translations: {
            en: "Intro",
          },
          items: [
            {
              label: "Velkommen",
              slug: "",
            },
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Dokumentasjon",
          autogenerate: { directory: "reference" },
        },
      ],
      components: {
        Sidebar: "./src/components/starlight/Sidebar.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/hackheim/hackheimweb",
        },
      ],
      defaultLocale: "root",
      locales: {
        root: {
          label: "Norsk",
          lang: "nb-no",
        },
        en: {
          label: "English",
          lang: "en",
        },
      },
      editLink: {
        baseUrl: "https://github.com/hackheim/hackheimweb/edit/new/",
      },
    }),
  ],
  adapter: cloudflare(),
  output: "static",
});
