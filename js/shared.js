/**
 * Shared constants and DOM helpers used across the site.
 * Content lives in js/content.js; secrets in config/site-config.js.
 */
window.Site = {
    STORAGE: {
        CV_UNLOCKED: 'cv-unlocked',
        VISIT_TRACKED: 'visit-tracked',
    },

    EXTERNAL_REL: 'noopener noreferrer',

    GITHUB_ICON_PATH:
        'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',

    getConfig() {
        return {
            trackVisits: true,
            web3formsAccessKey: '',
            ...(window.SITE_CONFIG || {}),
        };
    },

    getContent() {
        return window.SITE_CONTENT || null;
    },

    getUi() {
        return window.SITE_CONTENT?.ui || {};
    },

    queryMount(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`[site] Missing mount point: ${selector}`);
        }
        return element;
    },

    isSafeHttpUrl(url) {
        try {
            const parsed = new URL(url, window.location.href);
            return parsed.protocol === 'https:' || parsed.protocol === 'http:';
        } catch {
            return false;
        }
    },

    createElement(tag, options = {}, children = []) {
        const {
            className,
            id,
            textContent,
            hidden,
            attributes,
            ...attrs
        } = options;

        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (id) {
            element.id = id;
        }

        if (textContent !== undefined) {
            element.textContent = textContent;
        }

        if (hidden) {
            element.hidden = true;
        }

        Object.entries(attrs).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                element.setAttribute(key, value);
            }
        });

        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        children.forEach((child) => {
            if (child !== undefined && child !== null) {
                element.append(child);
            }
        });

        return element;
    },

    createExternalLink(href, label, className = 'entry-meta-link') {
        if (!Site.isSafeHttpUrl(href)) {
            return Site.createElement('span', { className, textContent: label });
        }

        return Site.createElement('a', {
            className,
            href,
            textContent: label,
            target: '_blank',
            rel: Site.EXTERNAL_REL,
        });
    },

    createGithubIconLink(href, projectTitle) {
        const link = Site.createElement('a', {
            className: 'project-github-link',
            href: Site.isSafeHttpUrl(href) ? href : '#',
            target: '_blank',
            rel: Site.EXTERNAL_REL,
            attributes: {
                'aria-label': `${projectTitle} on GitHub`,
            },
        });

        if (!Site.isSafeHttpUrl(href)) {
            link.removeAttribute('href');
            link.setAttribute('aria-disabled', 'true');
            return link;
        }

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.setAttribute('aria-hidden', 'true');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('d', Site.GITHUB_ICON_PATH);
        svg.append(path);
        link.append(svg);

        return link;
    },

    getDrawerMediaQuery() {
        const breakpoint = getComputedStyle(document.documentElement)
            .getPropertyValue('--drawer-breakpoint')
            .trim() || '1500px';

        return window.matchMedia(`(max-width: ${breakpoint})`);
    },
};

const { createElement, createExternalLink, createGithubIconLink, queryMount } = window.Site;
