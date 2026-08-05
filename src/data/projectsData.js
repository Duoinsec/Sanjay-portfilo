import nammaSewaImg from '../components/nammasewa.png';

export const staticProjects = [
    {
        id: 'nammasewa',
        title: 'NammaSewa',
        description: 'Career Guidance & Admission Support Portal - An online platform that provides guidance and support for students seeking admission in medical and engineering courses. Offers information about courses, admission processes, and counseling services to help students make informed academic decisions.',
        detailedExplanation: 'NammaSewa serves as a comprehensive bridge between aspiring students and educational institutions. Built with a focus on accessibility and user experience, the platform streamlines the complex admission process. Features include real-time admission tracking, personalized career counseling booking systems, and a vast database of course information categorized by field and location. The architecture ensures high availability during peak admission seasons using optimized database queries and robust state management.',
        image: nammaSewaImg,
        tags: ['React', 'Node.js', 'Education'],
        links: { demo: 'https://nammasewa.com/', github: '#' }
    },
    {
        id: 'billing-software',
        title: 'Billing Software',
        description: 'A web-based billing software developed to generate invoices, manage customers, and store billing records efficiently. The system automates billing processes and improves accuracy and productivity.',
        detailedExplanation: 'This enterprise-grade billing solution was developed to help small and medium businesses transition from manual ledgers to digital invoicing. The system features a robust dashboard for tracking monthly revenue, managing client profiles, and generating automated PDF invoices. Key technical implementations include complex state management for multi-item invoices, tax calculation algorithms, and secure data storage using relational database structures.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Node.js', 'MySQL', 'Bootstrap'],
        links: { demo: 'https://vkinfotech-billing-du1k.vercel.app/billing', github: '#' }
    },
    {
        id: 'academic-nexus',
        title: 'Academic Nexus',
        description: 'Research & Knowledge Sharing Platform - A web-based platform designed to share academic research and knowledge resources. It helps users access educational content and information through a structured digital interface.',
        detailedExplanation: 'Academic Nexus was built to democratize access to scholarly articles and research papers. It implements advanced search functionalities, enabling users to filter resources by topic, author, or publication date. The frontend leverages modern framework capabilities to deliver a snappy, SPA experience with server-side rendering for improved SEO and initial load times. It also features a collaborative peer-review module where authenticated users can annotate and discuss publications.',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        links: { demo: 'https://academic-nexus-delta.vercel.app', github: '#' }
    },
    {
        id: 'duoinsecgroups',
        title: 'DuoinsecGroups',
        description: 'Cybersecurity & Enterprise Solutions Platform - A professional website designed to showcase security services, training programs, and technical solutions. Highlights offerings such as security consulting, penetration testing, and cybersecurity training for businesses and learners.',
        detailedExplanation: 'Designed for a cybersecurity firm, this platform prioritizes trust, performance, and clear communication of complex services. The UI incorporates dark-mode aesthetics typical of the infosec industry while maintaining high accessibility standards. The backend handles lead generation forms securely, integrates with a CRM for client management, and features a bespoke booking system for penetration testing consultations.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Node.js', 'Tailwind CSS', 'Vercel'],
        links: { demo: 'https://duoinsecgroups.com/', github: '#' }
    },
    {
        id: 'holographic-ui',
        title: 'Holographic UI System',
        description: 'A comprehensive design system and component library focused on delivering cinematic user interfaces with real-time WebGL effects.',
        detailedExplanation: 'An experimental project exploring the boundaries of web interfaces. By combining WebGL shaders with standard DOM elements, this design system creates the illusion of depth, refraction, and holographic projections within a browser. The library provides a suite of React components (buttons, cards, modals) that utilize custom GLSL shaders to react dynamically to mouse movement and scroll events, offering a highly immersive user experience without compromising performance.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        tags: ['WebGL', 'GLSL', 'TypeScript'],
        links: { demo: '#', github: '#' }
    }
];
