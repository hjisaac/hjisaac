import type { SiteLocale } from './types';

export const siteLocale: SiteLocale = {
    meta: {
        title: 'Isaac Houngue | Software & Research Engineer',
        description:
            'Isaac Houngue is a software and research engineer with MSc backgrounds in Artificial Intelligence and Computer Science, working on machine learning and scientific AI systems.',
    },
    header: {
        logo: "Hello,",
    },
    nav: [
        { href: '#experiences', label: '#experience' },
        { href: '#education', label: '#education' },
        { href: '#skills', label: '#skills' },
        { href: '#projects', label: '#projects' },
        { href: '#contact', label: '#contact' },
        { href: '#papers', label: '#papers' },
    ],
    intro: {
        greeting: "I'm Isaac H. J. Houngue,",
        role_highlight: 'a software & research engineer.',
        headshot: '/assets/images/headshot_lower.jpg',
        headshot_alt: 'Isaac Houngue',
    },
    sections: {
        experience: { id: 'experiences', title: '#experience', theme: 'light' },
        education: { id: 'education', title: '#education', theme: 'dark' },
        skills: { id: 'skills', title: '#skills', theme: 'light' },
        projects: { id: 'projects', title: '#projects', theme: 'dark' },
        contact: {
            id: 'contact',
            title: '#contact',
            theme: 'light',
            prompt: "You'd like us to work together?",
            cv_file: '/assets/cv/isaac_houngue_cv_may_2026.pdf',
            download_intro: 'Thanks for saying hello — here is my CV.',
            download_label: 'Download CV (PDF)',
            form: {
                message_label: 'Message',
                message_placeholder: "Hello Isaac, I'm reaching out because…",
                submit_label: 'Say hello',
            },
        },
        papers: { id: 'papers', title: '#papers', theme: 'dark' },
    },
    footer: {
        copyright: '© 2022–2026 Isaac H. J. Houngue',
        note_before_link: 'Designed with simplicity and beauty in mind. Feel free to send feedback through the ',
        contact_link_label: 'contact form',
        contact_href: '#contact',
    },
    ui: {
        menu_open: 'Open menu',
        menu_close: 'Close menu',
        form_sending: 'Sending…',
        form_missing_key: 'Form is not configured yet. Add your access key to .env.',
        form_error: 'Something went wrong. Please try again or email me directly.',
        form_fallback_name: 'Anonymous',
        form_fallback_email: 'not provided',
        form_fallback_message: '(no message)',
        contact_subject: 'Contact — hjisaac.site',
        visit_subject: 'Site visit — hjisaac.site',
        visit_email: 'visitor@hjisaac.site',
        project_view_label: 'view live',
    },
};
