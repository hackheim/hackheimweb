import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob, file } from "astro/loaders";

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  }),
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
