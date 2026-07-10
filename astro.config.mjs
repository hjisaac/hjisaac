import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://hjisaac.site',
    integrations: [sitemap()],
});
