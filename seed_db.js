import { createClient } from '@supabase/supabase-js';

const staticProjects = [
    {
        id: 'nammasewa',
        title: 'NammaSewa',
        description: 'Career Guidance & Admission Support Portal - An online platform that provides guidance and support for students seeking admission in medical and engineering courses.',
        detailedExplanation: 'NammaSewa serves as a comprehensive bridge between aspiring students and educational institutions.',
        image: '/assets/nammasewa-CqW8Zq3_.png', // Mock URL
        tags: ['React', 'Node.js', 'Education'],
        links: { demo: 'https://nammasewa.com/', github: '#' }
    },
    {
        id: 'billing-software',
        title: 'Billing Software',
        description: 'A web-based billing software developed to generate invoices, manage customers, and store billing records efficiently.',
        detailedExplanation: 'This enterprise-grade billing solution was developed to help small and medium businesses transition from manual ledgers to digital invoicing.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Node.js', 'MySQL', 'Bootstrap'],
        links: { demo: 'https://vkinfotech-billing-du1k.vercel.app/billing', github: '#' }
    },
    {
        id: 'academic-nexus',
        title: 'Academic Nexus',
        description: 'Research & Knowledge Sharing Platform - A web-based platform designed to share academic research and knowledge resources.',
        detailedExplanation: 'Academic Nexus was built to democratize access to scholarly articles and research papers.',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        links: { demo: 'https://academic-nexus-delta.vercel.app', github: '#' }
    },
    {
        id: 'duoinsecgroups',
        title: 'DuoinsecGroups',
        description: 'Cybersecurity & Enterprise Solutions Platform - A professional website designed to showcase security services.',
        detailedExplanation: 'Designed for a cybersecurity firm, this platform prioritizes trust, performance, and clear communication of complex services.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Node.js', 'Tailwind CSS', 'Vercel'],
        links: { demo: 'https://duoinsecgroups.com/', github: '#' }
    },
    {
        id: 'holographic-ui',
        title: 'Holographic UI System',
        description: 'A comprehensive design system and component library focused on delivering cinematic user interfaces with real-time WebGL effects.',
        detailedExplanation: 'An experimental project exploring the boundaries of web interfaces.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        tags: ['WebGL', 'GLSL', 'TypeScript'],
        links: { demo: '#', github: '#' }
    }
];

const staticAchievements = [];

const supabaseUrl = 'https://ofrjkxwqeldkygsqbmbi.supabase.co';
const supabaseKey = 'sb_publishable_ROYtv0-Ur8MZkJHsID5cFA_aUq5npBO';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Seeding projects...");
    for (const sp of staticProjects) {
        // check if exists
        const { data: existing } = await supabase.from('projects').select('id').eq('title', sp.title).single();
        if (!existing) {
            const payload = {
                title: sp.title,
                description: sp.description,
                image_url: sp.image,
                demo_url: sp.links?.demo || '',
                github_url: sp.links?.github || '',
                display_order: 0,
                tags: sp.tags || []
            };
            const { error } = await supabase.from('projects').insert([payload]);
            if (error) console.error("Error inserting project", sp.title, error);
            else console.log("Inserted project:", sp.title);
        } else {
            console.log("Project already exists:", sp.title);
        }
    }

    console.log("Seeding achievements...");
    for (const sa of staticAchievements) {
        const { data: existing } = await supabase.from('achievements').select('id').eq('title', sa.title).single();
        if (!existing) {
            const payload = {
                title: sa.title,
                category: sa.category,
                date: sa.date,
                image: sa.image,
                description: sa.description,
                detailed_explanation: sa.detailedExplanation || ''
            };
            const { error } = await supabase.from('achievements').insert([payload]);
            if (error) console.error("Error inserting achievement", sa.title, error);
            else console.log("Inserted achievement:", sa.title);
        } else {
            console.log("Achievement already exists:", sa.title);
        }
    }
    console.log("Done.");
}

seed();
