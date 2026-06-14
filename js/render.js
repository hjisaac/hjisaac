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

    renderLogo('[data-mount="logo"]', content.header?.logo);
    renderNav('[data-mount="nav"]', content.nav);
    renderIntro('[data-mount="intro"]', content.intro);
    renderText('[data-mount="summary"]', content.summary);
    renderSections('[data-mount="sections"]', content.sections, content.ui);
    renderFooter('[data-mount="footer"]', content.footer);
}

function renderLogo(selector, text) {
    const element = queryMount(selector);
    if (!element || !text) {
        return;
    }

    element.replaceChildren(
        createElement('span', { className: 'logo-wave', attributes: { 'aria-hidden': 'true' }, textContent: '👋' }),
        document.createTextNode(` ${text}`),
    );
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

    const hero = createElement('div', { className: 'hero' });

    if (intro.headshot) {
        hero.append(createElement('img', {
            className: 'hero__photo',
            src: intro.headshot,
            alt: '',
            loading: 'eager',
            decoding: 'async',
            attributes: { 'aria-hidden': 'true' },
        }));
        hero.append(createElement('div', { className: 'hero__shade', attributes: { 'aria-hidden': 'true' } }));
    }

    hero.append(
        createElement('div', { className: 'intro__lines' }, [
            createElement('span', { className: 'intro__line', textContent: intro.greeting }),
            createElement('span', { className: 'intro__line' }, [
                createElement('span', { className: 'text-accent', textContent: intro.roleHighlight }),
            ]),
        ]),
    );

    container.replaceChildren(hero);
}

function renderFooter(selector, footer) {
    const container = queryMount(selector);
    if (!container || !footer) {
        return;
    }

    const note = createElement('p', { className: 'site-footer__note' }, [
        document.createTextNode(footer.noteBeforeLink || ''),
        createElement('a', {
            className: 'site-footer__link',
            href: footer.contactHref || '#contact',
            textContent: footer.contactLinkLabel || 'contact form',
        }),
        document.createTextNode('.'),
    ]);

    container.replaceChildren(
        createElement('p', { className: 'site-footer__copyright', textContent: footer.copyright }),
        note,
    );
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
        renderContactSection(sections.contact),
        renderPapersSection(sections.papers),
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

function renderPapersSection(section) {
    return renderEntrySection(section, (entry) => renderEntryArticle(entry));
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

function renderContactSection(section) {
    if (!section?.id || !section.form) {
        return null;
    }

    const element = createSectionElement(section);

    const gate = createElement('div', { id: 'contact-gate', className: 'section-content' }, [
        ...(section.prompt
            ? [createElement('p', { className: 'contact-intro', textContent: section.prompt })]
            : []),
        renderContactForm(section),
    ]);

    const download = createElement('div', {
        id: 'contact-download',
        className: 'section-content',
        hidden: true,
    }, [
        createElement('p', { className: 'contact-intro', textContent: section.downloadIntro }),
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

function renderContactForm(section) {
    const fields = section.form;

    return createElement('form', { id: 'contact-form', className: 'contact-form' }, [
        createElement('div', { className: 'contact-form__fields' }, [
            createElement('div', { className: 'contact-form__column contact-form__column--details' }, [
                createFormField('name', fields.nameLabel, 'text', 'name'),
                createFormField('email', fields.emailLabel, 'email', 'email'),
            ]),
            createElement('div', { className: 'contact-form__column contact-form__column--message' }, [
                createFormField('message', fields.messageLabel, 'textarea', undefined, fields.messagePlaceholder),
            ]),
        ]),
        createElement('button', { className: 'btn-outline', type: 'submit', textContent: fields.submitLabel }),
        createElement('p', {
            id: 'contact-form-status',
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
    if (Array.isArray(tools)) {
        container.textContent = tools.join(', ');
    }
    return container;
}

function createSectionTitle(section) {
    return createElement('h2', {
        className: 'section-title bg-blue-sky text-white',
        textContent: section.title,
    });
}
