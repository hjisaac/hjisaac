import { defineCollection, z } from 'astro:content';
import { githubArticlesLoader } from './lib/loaders/github-articles';

const articles = defineCollection({
    loader: githubArticlesLoader(),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        description: z.string(),
        published: z.boolean().default(false),
    }),
});

export const collections = { articles };
