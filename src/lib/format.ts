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
        return `<a class="entry-inline-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
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
