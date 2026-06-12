/**
 * Site content — edit this file to update copy, jobs, projects, and links.
 * Configuration secrets live in site-config.js.
 */
window.SITE_CONTENT = {
    meta: {
        title: 'Isaac Houngue | Software & Research Engineer',
    },

    header: {
        logo: "You're@hjisaac, welcome!",
    },

    nav: [
        { href: '#experiences', label: '#experience' },
        { href: '#education', label: '#education' },
        { href: '#skills', label: '#skills' },
        { href: '#projects', label: '#projects' },
        { href: '#resume', label: '#resume' },
    ],

    intro: {
        greeting: "Hi, I'm Isaac H. J. Houngue,",
        roleHighlight: 'a software & research engineer',
        roleSuffix: '& tech writer',
        headshot: './headshot_lower.jpg',
        headshotAlt: 'Isaac Houngue',
    },

    summary:
        'Motivated Software and Research Engineer with MSc backgrounds in Artificial Intelligence and Computer Science. I combine 3+ years of software engineering with research experience in machine learning and scientific AI — building intelligent systems that are simple, robust, and useful.',

    contact: {
        prompt: "You'd like us to work together?",
        location: 'Cape Town, South Africa',
        phone: { display: '+27 79 548 2528', href: 'tel:+27795482528' },
        email: { display: 'hjisaac.h@gmail.com', href: 'mailto:hjisaac.h@gmail.com' },
    },

    sections: {
        experience: {
            id: 'experiences',
            title: '#Experience',
            theme: 'light',
            titleVariant: 'pill',
            entries: [
                {
                    role: 'Apprentice Research Engineer',
                    organization: 'InstaDeep',
                    organizationUrl: 'https://instadeep.com/',
                    meta: 'Jul 2025 – Present · South Africa, hybrid',
                    bullets: [
                        'Evaluated fine-tuning strategies for adapting InstaNovo, a transformer-based de novo peptide sequencing model, to glycopeptide sequencing tasks.',
                        'Explored contrastive learning, multi-task learning, knowledge distillation, curriculum learning, and transformer-variant architectures to improve sequencing performance.',
                        'Designed modular, pluggable components inspired by research papers to accelerate hypothesis testing and integration of new modeling approaches.',
                        'Conducted large-scale experiments and ablation studies on architectural choices, training strategies, and model components.',
                        'Designed synthetic glycopeptide datasets and multi-stage training strategies to improve representation learning and transfer to experimental tasks.',
                        'Performed glycopeptide spectral dataset analysis and feature selection studies to understand data characteristics and model limitations.',
                        'Documented research findings through technical reports, visualizations, and presentations.',
                    ],
                },
                {
                    role: 'Backend Software Engineer',
                    organization: 'Fasfox',
                    organizationUrl: 'https://fasfox.com/',
                    meta: 'Mar 2023 – Sep 2024 · Paris, remote',
                    bullets: [
                        'Enhanced the backend API of Concrete Dispatch SaaS, a logistics platform for concrete deliveries (Django/DRF).',
                        'Improved a fiber ordering and tracking product for AXIONE (Django/DRF).',
                        'Developed a fault-tolerant daemon for parsing large CSV and eligibility data files for Fiber Dispatch (Django/Ninja).',
                        'Built TMForum compliant endpoints for fiber order handling following interop protocols (Django/Ninja).',
                        'Applied web scraping and AI-powered OCR to extract data from PDFs for real-time validation (Django/DRF).',
                        'Built and maintained a daemon that listens to email inboxes and parses attachments to create objects across databases (Django/DRF).',
                    ],
                },
                {
                    role: 'Frontend Software Engineer',
                    organization: 'Fasfox',
                    organizationUrl: 'https://fasfox.com/',
                    meta: 'Oct 2021 – Feb 2023 · Paris, remote',
                    bullets: [
                        'Maintained and enhanced Concrete Dispatch SaaS PWAs: photo uploads, digital signatures, QR scanning, and interactive graphs (Vue.js/Nuxt.js).',
                        'Developed an advanced slider for concrete volume tracking in the desktop web app (React.js/Next.js).',
                        'Built an efficient concrete calculator for the Concrete Dispatch blog site (Hugo/JavaScript).',
                    ],
                },
                {
                    role: 'Software Engineering Intern',
                    organization: 'National Civil Aviation Agency',
                    organizationUrl: 'https://anac.bj/',
                    meta: 'Aug 2019 – Sep 2019 · Benin, onsite',
                    bullets: [
                        'Developed a Python/Tkinter inventory management desktop application for tracking electronic equipment.',
                        'Assisted in maintenance of office and IT equipment.',
                    ],
                },
            ],
        },

        education: {
            id: 'education',
            title: '#Education',
            theme: 'dark',
            titleVariant: 'plain',
            entries: [
                {
                    title: 'MSc Artificial Intelligence — African Institute for Mathematical Sciences (AIMS)',
                    meta: 'Sep 2024 – Jul 2025 · South Africa',
                    footnoteMarker: '1',
                    footnote: 'In partnership with the University of Cape Town.',
                    bullets: [
                        'Coursework: Bayesian Inference, Machine Learning at Scale, Computer Vision, Reinforcement Learning, Deep Generative Models, Engineering LLMs, CUDA Programming, and more.',
                        'Thesis: Advancing De Novo Glycopeptide Sequencing with InstaNovo in Glycoproteomics.',
                    ],
                },
                {
                    title: 'MSc Computer Science — Institute of Mathematics and Physical Sciences (IMSP)',
                    meta: 'Oct 2018 – Jul 2020 · Benin',
                    bullets: [
                        'Coursework: Advanced Data Structures and Algorithms, Operating Systems, Software Architecture, Distributed Databases, Artificial Intelligence, Machine Learning, and more.',
                        'Thesis: A Smart Contract-based Remote Voting Platform using Blind Signature.',
                    ],
                },
            ],
        },

        skills: {
            id: 'skills',
            title: '#Skills',
            theme: 'light',
            titleVariant: 'plain',
            groups: [
                { label: 'Programming Languages', items: 'Python, JavaScript, TypeScript' },
                { label: 'Frameworks & Libraries', items: 'Django, DRF, Flask, Ninja, Node.js, Vue.js, React.js, Next.js, GraphQL, PyTorch, Keras' },
                { label: 'Infrastructure & Tools', items: 'Linux, Git, Docker, GCP, AWS, Kafka, Spark, PostgreSQL, MongoDB, Neo4j' },
            ],
        },

        projects: {
            id: 'projects',
            title: '#Projects',
            theme: 'dark',
            titleVariant: 'pill',
            // Optional per project: github, view (live demo), gif (preview path e.g. './assets/projects/run-crucible.gif')
            entries: [
                {
                    title: 'Run Crucible',
                    meta: 'Feb 2026 – Present',
                    summary: 'Modular framework for managing and comparing machine learning experiments across training configurations and model architectures.',
                    tools: ['Python', 'PyTorch', 'Hydra', 'Docker'],
                    github: 'https://github.com/hjisaac/run-crucible',
                },
                {
                    title: 'Billvoicer',
                    meta: 'Jan 2023 – Present · private',
                    bullets: [
                        'Initiator and principal engineer — leading architecture, feature development, and technology decisions.',
                        'Managing a team of interns: development, issue tracking, code reviews, and product alignment.',
                    ],
                    tools: ['Django', 'DRF', 'Vue.js', 'Nuxt.js', 'PostgreSQL', 'Redis', 'Celery'],
                },
                {
                    title: 'Recommender System',
                    meta: 'Oct 2024 – Feb 2025',
                    summary: 'Recommender system using ALS and collaborative filtering on the MovieLens dataset.',
                    tools: ['Python', 'NumPy', 'Streamlit'],
                    github: 'https://github.com/hjisaac/recommender-system',
                    view: 'https://recommender-system-cixeur34nxyb5prblsl4yt.streamlit.app/',
                },
                {
                    title: 'BVote',
                    meta: 'Jun 2021 – Jul 2021',
                    summary: 'Secure voting platform with anonymity via blind signatures and blockchain for transparency.',
                    tools: ['Node.js', 'React', 'GraphQL', 'Hyperledger', 'MongoDB'],
                    github: 'https://github.com/orgs/BVote/',
                },
                {
                    title: 'NSequence',
                    meta: 'Jan 2024 – Feb 2024',
                    summary: 'Python library for manipulating progressions and sequences.',
                    tools: ['Python'],
                    github: 'https://github.com/wehappit/nsequence',
                },
                {
                    title: 'Stream Processing Engine',
                    meta: 'Feb 2021 – Mar 2021',
                    summary: 'Simple e-commerce stream processing engine.',
                    tools: ['Python', 'Kafka', 'Redis', 'Socket.io'],
                    github: 'https://github.com/hjisaac/e-commerce-stream-processing',
                },
            ],
        },

        resume: {
            id: 'resume',
            title: '#Resume',
            theme: 'light',
            titleVariant: 'pill',
            cvFile: './isaac_houngue_cv_may_2026.pdf',
            gateIntro: "Say hello — I'd love to know who stopped by before sharing my CV.",
            downloadIntro: 'Thanks for saying hello — here is my CV.',
            downloadLabel: 'Download CV (PDF)',
            form: {
                nameLabel: 'Name',
                emailLabel: 'Email',
                messageLabel: 'Message',
                messagePlaceholder: "Hello Isaac, I'm reaching out because…",
                submitLabel: 'Say hello',
            },
        },
    },

    ui: {
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        formSending: 'Sending…',
        formMissingKey: 'Form is not configured yet. Add your Web3Forms key in site-config.js.',
        formError: 'Something went wrong. Please try again or email me directly.',
        formFallbackName: 'Anonymous',
        formFallbackEmail: 'not provided',
        formFallbackMessage: '(no message)',
        resumeSubject: 'Resume request — hjisaac.site',
        visitSubject: 'Site visit — hjisaac.site',
        visitEmail: 'visitor@hjisaac.site',
        projectViewLabel: 'view live',
    },
};
