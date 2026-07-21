import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { ARTICLES_LOCAL_DIR, ARTICLES_JOBS_PATH, ARTICLE_FILENAME } from './lib/articles';

const articles = defineCollection({
    loader: glob({
        pattern: `*/${ARTICLE_FILENAME}`,
        base: `${ARTICLES_LOCAL_DIR}/${ARTICLES_JOBS_PATH}`,
        // Every file is named ARTICLE.md, so the default id (relative path
        // minus extension) would be "<job-name>/ARTICLE" for every entry —
        // use the job folder name itself as the slug instead.
        generateId: ({ entry }) => entry.split('/')[0],
    }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        description: z.string(),
        published: z.boolean().default(false),
    }),
});

export const collections = { articles };
