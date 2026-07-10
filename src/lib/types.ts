export interface ContactItem {
    name: string;
    icon: string | null;
    value: string;
}

export interface WorkExperienceEntry {
    role: string;
    organization: string;
    organization_url: string | null;
    dates: string;
    location: string;
    summary: string | null;
    details: string[] | null;
}

export interface ProjectEntry {
    title: string;
    code_url: string | null;
    demo_url: string | null;
    paper_url: string | null;
    footnote: string | null;
    dates: string;
    summary: string | null;
    details: string[] | null;
    tools: string[];
}

export interface EducationEntry {
    degree: string;
    organization: string;
    organization_url: string | null;
    dates: string;
    location: string;
    footnote: string | null;
    summary: string | null;
    details: string[] | null;
}

export interface CvSection<T> {
    name: string;
    type: string;
    entries: T[];
}

export interface CvSkills {
    programming_languages: string[];
    frameworks_and_libraries: string[];
    infrastructure_and_tools: string[];
}

export interface CvData {
    labels: Record<string, string>;
    name: string;
    contact: ContactItem[];
    title: string;
    summary: string;
    sections: CvSection<unknown>[];
    skills: CvSkills;
    languages: Record<string, string>;
}

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
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
}

export interface PaperEntry {
    title: string;
    meta: string;
}

export interface SiteMeta {
    meta: { title: string; description: string };
    header: { logo: string };
    nav: NavItem[];
    intro: {
        greeting: string;
        roleHighlight: string;
        headshot: string;
        headshotAlt: string;
    };
    summary_key: string;
    sections: {
        experience: SectionMeta;
        education: SectionMeta;
        skills: SectionMeta;
        projects: SectionMeta;
        contact: SectionMeta & {
            prompt: string;
            cvFile: string;
            downloadIntro: string;
            downloadLabel: string;
            form: ContactFormMeta;
        };
        papers: SectionMeta & { entries: PaperEntry[] };
    };
    footer: {
        copyright: string;
        noteBeforeLink: string;
        contactLinkLabel: string;
        contactHref: string;
    };
    ui: Record<string, string>;
}
