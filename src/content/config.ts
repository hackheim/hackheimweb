import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    type: z.string(),
    featured: z.boolean(),
    difficulty: z.string(),
    estimatedTime: z.string(),
    materials: z.array(z.string()),
    tools: z.array(z.string()),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    githubUrl: z.string().optional(),
    published: z.boolean(),
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string().optional(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  projects,
  news,
};
