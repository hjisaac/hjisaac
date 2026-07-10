export const GITHUB_ICON_PATH =
    'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z';

export const SKILL_LABELS: Record<string, string> = {
    programming_languages: 'Programming Languages',
    frameworks_and_libraries: 'Frameworks & Libraries',
    infrastructure_and_tools: 'Infrastructure & Tools',
};

export function isSafeHttpUrl(url: string | null | undefined): url is string {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
        return false;
    }
}

export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Renders `**bold**` and `[label](url)` inline markdown (cvitae's own convention,
 * see cvitae/backend/build.py's markdown_to_latex) to safe HTML. */
export function mdInlineToHtml(text: string): string {
    let html = escapeHtml(text);
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, (_match, label: string, url: string) => {
        if (!isSafeHttpUrl(url)) return label;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
    return html;
}

/** Extracts {label, url} from a "[label](url)" markdown link string, e.g. cvitae's
 * contact `value` fields. Returns null if the string isn't a markdown link. */
export function parseMarkdownLink(text: string): { label: string; url: string } | null {
    const match = /^\[(.*?)\]\((.*?)\)$/.exec(text.trim());
    if (!match) return null;
    return { label: match[1], url: match[2] };
}

/** cvitae's raw `dates` strings use a literal " -- " separator and "Now" for
 * ongoing entries; normalize to an en dash and "Present" for display. */
export function normalizeDateRange(text: string | null | undefined): string {
    if (!text) return '';
    let normalized = text.replace(/ -- /g, ' – ');
    normalized = normalized.replace(/ – Now$/, ' – Present');
    return normalized;
}
