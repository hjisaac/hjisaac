document.addEventListener('DOMContentLoaded', () => {
    const content = Site.getContent();

    if (!content) {
        console.error('[site] SITE_CONTENT is missing. Load content.js before render.js.');
        return;
    }

    try {
        renderSite(content);
    } catch (error) {
        console.error('[site] Failed to render page.', error);
    }
});

function renderSite(content) {
    if (content.meta?.title) {
        document.title = content.meta.title;
    }

    renderText('[data-mount="logo"]', content.header?.logo);
    renderNav('[data-mount="nav"]', content.nav);
    renderIntro('[data-mount="intro"]', content.intro);
    renderText('[data-mount="summary"]', content.summary);
    renderContact('[data-mount="contact"]', content.contact);
    renderSections('[data-mount="sections"]', content.sections, content.ui);
}

function renderText(selector, text) {
    const element = queryMount(selector);
    if (element && text) {
        element.textContent = text;
    }
}

function renderNav(selector, items) {
    const container = queryMount(selector);
    if (!container || !Array.isArray(items)) {
        return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
        if (!item?.href || !item?.label) {
            return;
        }

        const link = createElement('a', { href: item.href, textContent: item.label });
        fragment.append(createElement('li', {}, [link]));
    });

    container.replaceChildren(fragment);
}

function renderIntro(selector, intro) {
    const container = queryMount(selector);
    if (!container || !intro) {
        return;
    }

    container.replaceChildren(
        createElement('div', { className: 'medium-line-height' }, [
            document.createTextNode(intro.greeting),
            createElement('br'),
            createElement('span', { className: 'text-aqua', textContent: intro.roleHighlight }),
            createElement('img', {
                className: 'headshot',
                src: intro.headshot,
                alt: intro.headshotAlt,
                loading: 'lazy',
                decoding: 'async',
            }),
            createElement('br'),
            document.createTextNode(` ${intro.roleSuffix} `),
            createElement('span', { className: 'blinking-cursor', attributes: { 'aria-hidden': 'true' } }),
        ]),
    );
}

function renderContact(selector, contact) {
    const container = queryMount(selector);
    if (!container || !contact) {
        return;
    }

    const lines = [
        createParagraph('high-line-height contact-links', contact.prompt),
        createParagraph('high-line-height contact-links', contact.location),
    ];

    if (contact.phone?.href && contact.phone?.display) {
        lines.push(createContactLine('Call me on ', contact.phone));
    }

    if (contact.email?.href && contact.email?.display) {
        lines.push(createContactLine('Email me at ', contact.email));
    }

    container.replaceChildren(...lines);
}

function createContactLine(prefix, linkData) {
    const paragraph = createElement('p', { className: 'high-line-height contact-links' });
    const link = createElement('a', { href: linkData.href });
    link.textContent = `${prefix}${linkData.display}`;
    paragraph.append(link);
    return paragraph;
}

function createParagraph(className, text) {
    return createElement('p', { className, textContent: text });
}

function renderSections(selector, sections, ui) {
    const container = queryMount(selector);
    if (!container || !sections) {
        return;
    }

    const renderedSections = [
        renderExperienceSection(sections.experience),
        renderEducationSection(sections.education),
        renderSkillsSection(sections.skills),
        renderProjectsSection(sections.projects, ui),
        renderResumeSection(sections.resume),
    ].filter(Boolean);

    container.replaceChildren(...renderedSections);
}

function renderExperienceSection(section) {
    return renderEntrySection(section, (entry) => renderEntryArticle(entry));
}

function renderEducationSection(section) {
    return renderEntrySection(section, (entry) => renderEntryArticle(entry, {
        footnote: entry.footnote,
        footnoteMarker: entry.footnoteMarker,
    }));
}

function renderProjectsSection(section, ui) {
    return renderEntrySection(section, (entry) => renderProjectEntry(entry, ui));
}

function renderEntrySection(section, renderEntry) {
    if (!section?.id || !Array.isArray(section.entries)) {
        return null;
    }

    const element = createSectionElement(section);
    const fragment = document.createDocumentFragment();

    section.entries.forEach((entry) => {
        if (entry) {
            fragment.append(renderEntry(entry));
        }
    });

    element.append(fragment);
    return element;
}

function createSectionElement(section) {
    return createElement('section', {
        id: section.id,
        className: section.theme === 'light' ? 'bg-white' : undefined,
    }, [
        createSectionTitle(section),
    ]);
}

function renderSkillsSection(section) {
    if (!section?.id || !Array.isArray(section.groups)) {
        return null;
    }

    const element = createSectionElement(section);
    const fragment = document.createDocumentFragment();

    section.groups.forEach((group) => {
        if (!group?.label) {
            return;
        }

        fragment.append(
            createElement('div', { className: 'skills-group' }, [
                createElement('h3', { className: 'skills-label', textContent: group.label }),
                createElement('p', { className: 'skills-list', textContent: group.items || '' }),
            ]),
        );
    });

    element.append(fragment);
    return element;
}

function renderResumeSection(section) {
    if (!section?.id || !section.form) {
        return null;
    }

    const element = createSectionElement(section);

    const gate = createElement('div', { id: 'resume-gate', className: 'resume-gate section-content' }, [
        createElement('p', { className: 'resume-intro', textContent: section.gateIntro }),
        renderResumeForm(section),
    ]);

    const download = createElement('div', {
        id: 'resume-download',
        className: 'section-content',
        hidden: true,
    }, [
        createElement('p', { className: 'resume-intro', textContent: section.downloadIntro }),
        createElement('a', {
            className: 'btn-outline',
            href: section.cvFile,
            download: true,
            textContent: section.downloadLabel,
        }),
    ]);

    element.append(gate, download);
    return element;
}

function renderResumeForm(section) {
    const fields = section.form;

    return createElement('form', { id: 'resume-form', className: 'resume-form' }, [
        createFormField('name', fields.nameLabel, 'text', 'name'),
        createFormField('email', fields.emailLabel, 'email', 'email'),
        createFormField('message', fields.messageLabel, 'textarea', undefined, fields.messagePlaceholder),
        createElement('button', { className: 'btn-outline', type: 'submit', textContent: fields.submitLabel }),
        createElement('p', {
            id: 'resume-form-status',
            className: 'form-status',
            attributes: { 'aria-live': 'polite' },
        }),
    ]);
}

function createFormField(name, label, type, autocomplete, placeholder) {
    const field = createElement('label', { className: 'form-field' }, [
        createElement('span', { className: 'form-label', textContent: label }),
    ]);

    if (type === 'textarea') {
        field.append(createElement('textarea', { name, rows: 4, placeholder }));
    } else {
        field.append(createElement('input', { type, name, autocomplete }));
    }

    return field;
}

function renderProjectEntry(entry, ui) {
    const article = createProjectEntryHeader(entry, ui);
    appendEntryBody(article, entry);
    return article;
}

function renderEntryArticle(entry, { footnote, footnoteMarker } = {}) {
    const article = createEntryHeader(entry, footnoteMarker);

    if (entry.bullets?.length) {
        article.append(renderBulletList(entry.bullets));
    }

    if (footnote) {
        article.append(renderFootnote(footnote, footnoteMarker));
    }

    return article;
}

function appendEntryBody(article, entry) {
    if (entry.gif) {
        article.append(createElement('img', {
            className: 'project-preview',
            src: entry.gif,
            alt: `${entry.title} preview`,
            loading: 'lazy',
            decoding: 'async',
        }));
    }

    if (entry.summary) {
        article.append(createElement('p', { className: 'entry-summary', textContent: entry.summary }));
    }

    if (entry.bullets?.length) {
        article.append(renderBulletList(entry.bullets));
    }

    if (entry.tools?.length) {
        article.append(renderToolTags(entry.tools));
    }
}

function createProjectEntryHeader(entry, ui) {
    const titleRow = createElement('div', { className: 'entry-title-row' });

    if (entry.github) {
        titleRow.append(createGithubIconLink(entry.github, entry.title));
    }

    titleRow.append(createElement('h3', { className: 'entry-title', textContent: entry.title }));

    return createElement('article', { className: 'entry' }, [
        createElement('header', { className: 'entry-header' }, [
            titleRow,
            renderProjectMeta(entry, ui),
        ]),
    ]);
}

function renderProjectMeta(entry, ui) {
    const meta = createElement('p', { className: 'entry-meta' });
    meta.append(document.createTextNode(entry.meta || ''));

    if (entry.view) {
        meta.append(document.createTextNode(' · '));
        meta.append(createExternalLink(entry.view, ui?.projectViewLabel || 'view live', 'entry-meta-link'));
    }

    return meta;
}

function createEntryHeader(entry, footnoteMarker) {
    const title = entry.role
        ? createExperienceTitle(entry)
        : createElement('h3', { className: 'entry-title', textContent: entry.title || '' });

    if (footnoteMarker && !entry.role) {
        title.append(createElement('sup', { className: 'footnote-ref', textContent: footnoteMarker }));
    }

    return createElement('article', { className: 'entry' }, [
        createElement('header', { className: 'entry-header' }, [
            title,
            createElement('p', { className: 'entry-meta', textContent: entry.meta || '' }),
        ]),
    ]);
}

function createExperienceTitle(entry) {
    const title = createElement('h3', { className: 'entry-title' });
    title.append(document.createTextNode(`${entry.role} — `));

    if (entry.organizationUrl && entry.organization) {
        title.append(createExternalLink(
            entry.organizationUrl,
            entry.organization,
            'entry-org-link',
        ));
    } else if (entry.organization) {
        title.append(document.createTextNode(entry.organization));
    }

    return title;
}

function renderFootnote(text, marker = '1') {
    const note = createElement('p', { className: 'entry-footnote' });
    note.append(createElement('sup', { textContent: marker }));
    note.append(document.createTextNode(` ${text}`));
    return note;
}

function renderBulletList(items) {
    const list = createElement('ul', { className: 'entry-list' });

    items.forEach((item) => {
        const li = document.createElement('li');

        if (typeof item === 'string' && item.startsWith('Thesis: ')) {
            li.append(document.createTextNode('Thesis: '));
            li.append(createElement('em', { textContent: item.slice(8) }));
        } else {
            li.textContent = String(item);
        }

        list.append(li);
    });

    return list;
}

function renderToolTags(tools) {
    const container = createElement('p', { className: 'entry-tools' });
    tools.forEach((tool) => {
        container.append(createElement('span', { className: 'tool-tag', textContent: tool }));
    });
    return container;
}

function createSectionTitle(section) {
    const classes = [];

    if (section.titleVariant === 'pill') {
        classes.push('section-title', 'bg-blue-sky', 'text-white');
    }

    return createElement('h2', {
        className: classes.length ? classes.join(' ') : undefined,
        textContent: section.title,
    });
}
