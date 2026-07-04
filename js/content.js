/** AUTO-GENERATED FROM CVITAE — run: make sync **/
window.SITE_CONTENT = {
    "meta": {
        "title": "Isaac Houngue | Software & Research Engineer"
    },
    "header": {
        "logo": "you're@hjisaac"
    },
    "nav": [
        {
            "href": "#experiences",
            "label": "#experience"
        },
        {
            "href": "#education",
            "label": "#education"
        },
        {
            "href": "#skills",
            "label": "#skills"
        },
        {
            "href": "#projects",
            "label": "#projects"
        },
        {
            "href": "#contact",
            "label": "#contact"
        },
        {
            "href": "#papers",
            "label": "#papers"
        }
    ],
    "intro": {
        "greeting": "I'm Isaac H. J. Houngue,",
        "roleHighlight": "a software & research engineer.",
        "headshot": "./assets/images/headshot_lower.jpg",
        "headshotAlt": "Isaac Houngue"
    },
    "summary": "Motivated and hardworking Software and Research Engineer with MSc backgrounds in Artificial Intelligence and Computer Science, combining 3+ years of software engineering experience with research engineering experience in machine learning and scientific AI systems. Strong debugging and problem-solving skills; passionate about developing intelligent systems and translating research into usable, simple, effective, robust, and innovative solutions. Proactive and initiative-driven, accustomed to quality-focused environments and ready to take on challenging tasks with confidence and commitment.",
    "sections": {
        "experience": {
            "id": "experiences",
            "title": "#experience",
            "theme": "light",
            "entries": [
                {
                    "role": "Apprentice Research Engineer",
                    "organization": "InstaDeep",
                    "bullets": [
                        "Evaluated fine-tuning strategies for adapting InstaNovo, a transformer-based de novo peptide sequencing model, to glycopeptide sequencing tasks.",
                        "Explored contrastive learning, multi-task learning, knowledge distillation, curriculum learning, and transformer-variant architectures to improve sequencing performance.",
                        "Designed modular, pluggable components inspired by research papers to accelerate hypothesis testing and integration of new modeling approaches.",
                        "Conducted large-scale experiments and ablation studies on architectural choices, training strategies, and model components.",
                        "Designed synthetic glycopeptide datasets and multi-stage training strategies to improve representation learning and transfer to experimental tasks.",
                        "Performed glycopeptide spectral dataset analysis and feature selection studies to understand data characteristics and model limitations.",
                        "Documented research findings through technical reports, visualizations, and presentations."
                    ],
                    "organizationUrl": "https://instadeep.com/",
                    "meta": "Jul 2025 – Present · South Africa, hybrid"
                },
                {
                    "role": "Backend Software Engineer",
                    "organization": "Fasfox",
                    "bullets": [
                        "Enhanced the backend API of Concrete Dispatch SaaS, a logistics platform for managing concrete deliveries (Django/DRF).",
                        "Improved a fiber ordering and tracking product for AXIONE (Django/DRF).",
                        "Developed a fault-tolerant daemon for parsing large CSV and eligibility data files for Fiber Dispatch (Django/Ninja).",
                        "Built TMForum compliant endpoints for fiber order handling following interop protocols (Django/Ninja).",
                        "Applied web scraping and AI-powered OCR to extract data from PDFs for real-time validation (Django/DRF).",
                        "Built and maintained a daemon that listens to email inboxes and parses attachments to create objects across databases (Django/DRF)."
                    ],
                    "organizationUrl": "https://fasfox.com/",
                    "meta": "Mar 2023 – Sep 2024 · Paris, remote"
                },
                {
                    "role": "Frontend Software Engineer",
                    "organization": "Fasfox",
                    "bullets": [
                        "Maintained and enhanced Concrete Dispatch SaaS PWAs: photo uploads, digital signatures, QR scanning, and interactive graphs (Vue.js/Nuxt.js).",
                        "Developed an advanced slider for concrete volume tracking in the desktop web app (React.js/Next.js).",
                        "Built an efficient concrete calculator for the Concrete Dispatch blog site (Hugo/JavaScript)."
                    ],
                    "organizationUrl": "https://fasfox.com/",
                    "meta": "Oct 2021 – Feb 2023 · Paris, remote"
                },
                {
                    "role": "Software Engineering Intern",
                    "organization": "National Civil Aviation Agency",
                    "bullets": [
                        "Developed a Python/Tkinter inventory management desktop application for tracking electronic equipment.",
                        "Assisted in maintenance of office and IT equipment."
                    ],
                    "organizationUrl": "https://anac.bj/",
                    "meta": "Aug 2019 – Sep 2019 · Benin, onsite"
                }
            ]
        },
        "education": {
            "id": "education",
            "title": "#education",
            "theme": "dark",
            "entries": [
                {
                    "title": "MSc Artificial Intelligence — African Institute for Mathematical Sciences (AIMS)",
                    "meta": "Sep 2024 – Jul 2025 · South Africa",
                    "bullets": [
                        "Coursework: Bayesian Inference, Machine Learning at Scale, Computer Vision, Reinforcement Learning, Deep Generative Models, Engineering LLMs, CUDA Programming, and more.",
                        "Thesis: Advancing De Novo Glycopeptide Sequencing with InstaNovo in Glycoproteomics."
                    ],
                    "footnote": "In partnership with the University of Cape Town.",
                    "footnoteMarker": "1"
                },
                {
                    "title": "MSc Computer Science — Institute of Mathematics and Physical Sciences (IMSP)",
                    "meta": "Oct 2018 – Jul 2020 · Benin",
                    "bullets": [
                        "Coursework: Advanced Data Structures and Algorithms, Operating Systems, Software Architecture, Distributed Databases, Artificial Intelligence, Machine Learning and more.",
                        "Thesis: A Smart Contract-based Remote Voting Platform using Blind Signature."
                    ]
                }
            ]
        },
        "skills": {
            "id": "skills",
            "title": "#skills",
            "theme": "light",
            "groups": [
                {
                    "label": "Programming Languages",
                    "items": "Python, JavaScript, TypeScript"
                },
                {
                    "label": "Frameworks & Libraries",
                    "items": "Django, DRF, Flask, Ninja, Node.js, Vue.js, React.js, Next.js, GraphQL, PyTorch, Keras"
                },
                {
                    "label": "Infrastructure & Tools",
                    "items": "Linux, Git, Docker, GCP, AWS, Kafka, Spark, PostgreSQL, MongoDB, Neo4j"
                }
            ]
        },
        "projects": {
            "id": "projects",
            "title": "#projects",
            "theme": "dark",
            "entries": [
                {
                    "title": "Run Crucible",
                    "meta": "Feb 2026 – Present",
                    "tools": [
                        "Python",
                        "PyTorch",
                        "Hydra",
                        "Docker"
                    ],
                    "github": "https://github.com/hjisaac/run-crucible",
                    "summary": "Modular framework for managing and comparing machine learning experiments across training configurations and model architectures."
                },
                {
                    "title": "Billvoicer",
                    "meta": "Jan 2023 – Present · private",
                    "tools": [
                        "Python (Django/Drf)",
                        "VueJS/NuxtJS",
                        "PostgreSQL",
                        "Redis",
                        "Celery"
                    ],
                    "github": null,
                    "bullets": [
                        "Leading architecture design, feature development, and technology decisions.",
                        "Managing a team of interns, overseeing development activities, issue tracking, code reviews and more.",
                        "Ensuring seamless team communication and alignment with the product roadmap."
                    ]
                },
                {
                    "title": "Recommender System",
                    "meta": "Oct 2024 – Feb 2025",
                    "tools": [
                        "Python",
                        "NumPy",
                        "Streamlit"
                    ],
                    "github": "https://github.com/hjisaac/recommender-system",
                    "summary": "Developed a recommender system using ALS and collaborative filtering built using the MovieLens dataset.",
                    "view": "https://recommender-system-cixeur34nxyb5prblsl4yt.streamlit.app/"
                },
                {
                    "title": "BVote",
                    "meta": "Jun 2021 – Jul 2021",
                    "tools": [
                        "Node.js",
                        "ReactJS",
                        "GraphQL",
                        "HyperLedger",
                        "MongoDB"
                    ],
                    "github": "https://github.com/orgs/BVote/",
                    "summary": "Developed a secure voting platform with anonymity via blind signatures and blockchain for transparency."
                },
                {
                    "title": "NSequence",
                    "meta": "Jan 2024 – Feb 2024",
                    "tools": [
                        "Python"
                    ],
                    "github": "https://github.com/wehappit/nsequence",
                    "summary": "Developed a Python library for manipulating progressions or sequences."
                },
                {
                    "title": "Stream Processing Engine",
                    "meta": "Feb 2021 – Mar 2021",
                    "tools": [
                        "Python",
                        "Kafka",
                        "Redis",
                        "Socket.io"
                    ],
                    "github": "https://github.com/hjisaac/e-commerce-stream-processing",
                    "summary": "Built a simple e-commerce stream processing engine."
                }
            ]
        },
        "contact": {
            "id": "contact",
            "title": "#contact",
            "theme": "light",
            "prompt": "You'd like us to work together?",
            "form": {
                "nameLabel": "Name",
                "emailLabel": "Email",
                "messageLabel": "Message",
                "messagePlaceholder": "Hello Isaac, I'm reaching out because…",
                "submitLabel": "Say hello"
            },
            "cvFile": "./assets/cv/isaac_houngue_cv_may_2026.pdf",
            "downloadIntro": "Thanks for saying hello — here is my CV.",
            "downloadLabel": "Download CV (PDF)"
        },
        "papers": {
            "id": "papers",
            "title": "#papers",
            "theme": "dark",
            "entries": [
                {
                    "title": "Advancing De Novo Glycopeptide Sequencing with InstaNovo in Glycoproteomics",
                    "meta": "MSc thesis · African Institute for Mathematical Sciences · 2025"
                },
                {
                    "title": "A Smart Contract-based Remote Voting Platform using Blind Signature",
                    "meta": "MSc thesis · Institute of Mathematics and Physical Sciences · 2020"
                }
            ]
        }
    },
    "footer": {
        "copyright": "© 2022–2026 Isaac H. J. Houngue",
        "noteBeforeLink": "Designed with simplicity and beauty in mind. Feel free to send feedback through the ",
        "contactLinkLabel": "contact form",
        "contactHref": "#contact"
    },
    "ui": {
        "menuOpen": "Open menu",
        "menuClose": "Close menu",
        "formSending": "Sending…",
        "formMissingKey": "Form is not configured yet. Add your access key to config/site-config.js.",
        "formError": "Something went wrong. Please try again or email me directly.",
        "formFallbackName": "Anonymous",
        "formFallbackEmail": "not provided",
        "formFallbackMessage": "(no message)",
        "contactSubject": "Contact — hjisaac.site",
        "visitSubject": "Site visit — hjisaac.site",
        "visitEmail": "visitor@hjisaac.site",
        "projectViewLabel": "view live"
    }
};