import type { SiteLocale } from './types';

export const siteLocale: SiteLocale = {
    meta: {
        title: 'Isaac Houngue | Ingénieur Logiciel & Recherche',
        description:
            "Isaac Houngue est ingénieur logiciel et de recherche, titulaire de masters en intelligence artificielle et en informatique, travaillant sur l'apprentissage automatique et les systèmes d'IA scientifique.",
    },
    header: {
        logo: "Salut,",
    },
    nav: [
        { href: '#experiences', label: '#expérience' },
        { href: '#education', label: '#éducation' },
        { href: '#skills', label: '#compétences' },
        { href: '#projects', label: '#projets' },
        { href: '#contact', label: '#contact' },
        { href: '#papers', label: '#publications' },
    ],
    intro: {
        greeting: 'Je suis Isaac H. J. Houngue,',
        role_highlight: 'ingénieur logiciel & de recherche.',
        headshot: '/assets/images/headshot_lower.jpg',
        headshot_alt: 'Isaac Houngue',
    },
    sections: {
        experience: { id: 'experiences', title: '#expérience', theme: 'light' },
        education: { id: 'education', title: '#éducation', theme: 'dark' },
        skills: {
            id: 'skills',
            title: '#compétences',
            theme: 'light',
            labels: {
                programming_languages: 'Langages de programmation',
                frameworks_and_libraries: 'Frameworks et bibliothèques',
                infrastructure_and_tools: 'Infrastructure et outils',
            },
        },
        projects: { id: 'projects', title: '#projets', theme: 'dark' },
        contact: {
            id: 'contact',
            title: '#contact',
            theme: 'light',
            prompt: "Vous aimeriez qu'on travaille ensemble ?",
            cv_file: '/assets/cv/isaac_houngue_cv_may_2026.pdf',
            download_intro: "Merci de m'avoir contacté — voici mon CV.",
            download_label: 'Télécharger le CV (PDF)',
            form: {
                message_label: 'Message',
                message_placeholder: 'Bonjour Isaac, je vous contacte car…',
                submit_label: 'Dire bonjour',
            },
        },
        papers: { id: 'papers', title: '#publications', theme: 'dark' },
        articles: { id: 'articles', title: '#articles', theme: 'light' },
    },
    footer: {
        copyright: '© 2022–2026 Isaac H. J. Houngue',
        note_before_link:
            "Conçu avec simplicité et élégance. N'hésitez pas à envoyer vos retours via le ",
        contact_link_label: 'formulaire de contact',
        contact_href: '#contact',
    },
    ui: {
        menu_open: 'Ouvrir le menu',
        menu_close: 'Fermer le menu',
        form_sending: 'Envoi…',
        form_missing_key: "Le formulaire n'est pas encore configuré. Ajoutez votre clé d'accès dans .env.",
        form_error: "Une erreur est survenue. Merci de réessayer ou de m'envoyer un e-mail directement.",
        form_fallback_name: 'Anonyme',
        form_fallback_email: 'non renseigné',
        form_fallback_message: '(aucun message)',
        contact_subject: 'Contact — hjisaac.site',
        visit_subject: 'Visite du site — hjisaac.site',
        visit_email: 'visitor@hjisaac.site',
        project_view_label: 'voir en ligne',
    },
};
