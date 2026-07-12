export interface NavItem {
    href: string;
    label: string;
}

export interface SectionMeta {
    id: string;
    title: string;
    theme: 'light' | 'dark';
}

export interface ContactFormMeta {
    message_label: string;
    message_placeholder: string;
    submit_label: string;
}

export interface SiteLocale {
    meta: { title: string; description: string };
    header: { logo: string };
    nav: NavItem[];
    intro: {
        greeting: string;
        role_highlight: string;
        headshot: string;
        headshot_alt: string;
    };
    sections: {
        experience: SectionMeta;
        education: SectionMeta;
        skills: SectionMeta;
        projects: SectionMeta;
        contact: SectionMeta & {
            prompt: string;
            cv_file: string;
            download_intro: string;
            download_label: string;
            form: ContactFormMeta;
        };
        papers: SectionMeta;
    };
    footer: {
        copyright: string;
        note_before_link: string;
        contact_link_label: string;
        contact_href: string;
    };
    ui: {
        menu_open: string;
        menu_close: string;
        form_sending: string;
        form_missing_key: string;
        form_error: string;
        form_fallback_name: string;
        form_fallback_email: string;
        form_fallback_message: string;
        contact_subject: string;
        visit_subject: string;
        visit_email: string;
        project_view_label: string;
    };
}
