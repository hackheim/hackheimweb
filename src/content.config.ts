import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob, file } from "astro/loaders";

export const collections = {
  pages: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  }),
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  projects: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        type: z.enum(["tutorial", "showcase"]).default("showcase"),
        featured: z.boolean().default(false),
        difficulty: z
          .enum(["beginner", "intermediate", "advanced"])
          .default("intermediate"),
        estimatedTime: z.string().optional(),
        materials: z.array(z.string()).optional(),
        tools: z.array(z.string()).optional(),
        coverImage: image().optional(),
        images: z.array(z.string()).optional(),
        githubUrl: z.string().optional(),
        projectUrl: z.string().optional(),
        published: z.boolean().default(true),
        projectId: z.string().optional(),
        variants: z.array(z.object({
          slug: z.string(),
          label: z.string(),
          features: z.record(z.boolean()).default({}),
          includeTags: z.array(z.string()).optional(),
          excludeTags: z.array(z.string()).optional(),
        })).optional(),
      }),
  }),
  news: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        excerpt: z.string(),
        author: z.string().optional(),
        date: z.date(),
        image: image().optional(),
        tags: z.array(z.string()).optional(),
        published: z.boolean().default(true),
      }),
  }),
};
