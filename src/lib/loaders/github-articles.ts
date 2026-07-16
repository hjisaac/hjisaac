import type { Loader } from 'astro/loaders';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { ARTICLES_REPO, ARTICLES_BRANCH, ARTICLES_JOBS_PATH, ARTICLE_FILENAME } from '../features';

interface GitTreeEntry {
    path: string;
    type: string;
}

const articlePathPattern = new RegExp(`^${ARTICLES_JOBS_PATH}/([^/]+)/${ARTICLE_FILENAME}$`);

// Fetches jobs/<slug>/ARTICLE.md straight from GitHub's API at build time —
// no local clone or submodule of run-crucible needed, since the site only
// ever needs the frontmatter (title/date/description/published), never the
// body (articles are read on GitHub itself, see ArticleCard.astro).
export function githubArticlesLoader(): Loader {
    return {
        name: 'github-articles-loader',
        load: async ({ store, parseData, logger }) => {
            const treeUrl = `https://api.github.com/repos/${ARTICLES_REPO}/git/trees/${ARTICLES_BRANCH}?recursive=1`;
            const treeRes = await fetch(treeUrl);
            if (!treeRes.ok) {
                throw new Error(`Failed to list ${ARTICLES_REPO}@${ARTICLES_BRANCH}: ${treeRes.status} ${treeRes.statusText}`);
            }
            const { tree } = (await treeRes.json()) as { tree: GitTreeEntry[] };

            store.clear();

            let publishedCount = 0;
            for (const entry of tree) {
                if (entry.type !== 'blob') continue;
                const match = articlePathPattern.exec(entry.path);
                if (!match) continue;

                const slug = match[1];
                const rawUrl = `https://raw.githubusercontent.com/${ARTICLES_REPO}/${ARTICLES_BRANCH}/${entry.path}`;
                const rawRes = await fetch(rawUrl);
                if (!rawRes.ok) {
                    throw new Error(`Failed to fetch ${entry.path}: ${rawRes.status} ${rawRes.statusText}`);
                }
                const { frontmatter } = parseFrontmatter(await rawRes.text());

                if (!frontmatter.published) continue;

                const data = await parseData({ id: slug, data: frontmatter });
                store.set({ id: slug, data });
                publishedCount++;
            }

            logger.info(`Loaded ${publishedCount} published article(s) from ${ARTICLES_REPO}@${ARTICLES_BRANCH}`);
        },
    };
}
