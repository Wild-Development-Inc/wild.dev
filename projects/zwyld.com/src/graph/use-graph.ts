import { useMemo } from 'react'

export const useGraph = () => {
    return useMemo(
        () => ({
            nodes: [...todoGraphData.nodes],
            edges: [...todoGraphData.edges],
            metadata: {
                layout: 'attention-spiral',
                showLabels: true,
                showEdgeWeights: true,
            },
        }),
        []
    )
}

// TopoGlyph Pattern: ⦿Person → ⋱⋰ → ◾Task (people connected to their tasks)
// Attention Pattern: ♦ (needs attention) vs ♣ (satisfied/complete)

interface TodoGraphData {
    nodes: Array<{
        id: string
        label: string
        type: 'person' | 'task' | 'project' | 'financial'
        attention_needed?: boolean
        category?: string
        priority?: 'high' | 'medium' | 'low'
        status?: 'todo' | 'in_progress' | 'blocked' | 'complete'
        amount?: string
    }>
    edges: Array<{
        source: string
        target: string
        type: 'responsible_for' | 'depends_on' | 'related_to'
        weight?: number
    }>
    metadata: {
        layout: 'force'
        showLabels: true
        showEdgeWeights: false
    }
}

const todoGraphData: TodoGraphData = {
    nodes: [
        // People nodes - ⦿ symbols in TopoGlyph
        {
            id: 'myself',
            label: 'Myself',
            type: 'person',
            attention_needed: false, // Central node, actively managing
        },
        {
            id: 'katya',
            label: 'Katya',
            type: 'person',
            attention_needed: true, // Multiple tasks, NYC visit
        },
        {
            id: 'steve',
            label: 'Steve',
            type: 'person',
            attention_needed: true, // Unclear task ("???")
        },
        {
            id: 'mom',
            label: 'Mom',
            type: 'person',
            attention_needed: true, // Health module unclear
        },
        {
            id: 'dad',
            label: 'Dad',
            type: 'person',
            attention_needed: false, // Clear task (averagejoes.ai)
        },
        {
            id: 'dr_menlo',
            label: 'Dr. Menlo',
            type: 'person',
            attention_needed: false, // Simple email task
        },
        {
            id: 'layla',
            label: 'Layla',
            type: 'person',
            attention_needed: true, // Clear health-related tasks
        },
        {
            id: 'maddie',
            label: 'Maddie',
            type: 'person',
            attention_needed: false, // Clear tooth pain task
        },
        {
            id: 'grandma',
            label: 'Grandma',
            type: 'person',
            attention_needed: true, // Unclear what to make for her
        },
        {
            id: 'nece',
            label: 'Nece',
            type: 'person',
            attention_needed: false, // Clear wand controller project
        },
        {
            id: 'nene',
            label: 'Nene',
            type: 'person',
            attention_needed: false, // Clear task
        },
        {
            id: 'patty',
            label: 'Patty',
            type: 'person',
            attention_needed: false, // Clear task
        },
        {
            id: 'don',
            label: 'Don',
            type: 'person',
            attention_needed: false, // Clear task
        },
        {
            id: 'asta',
            label: 'Asta',
            type: 'person',
            attention_needed: true, // Implementation unclear ("simple impl?")
        },
        {
            id: 'eric',
            label: 'Eric',
            type: 'person',
            attention_needed: false, // Clear blog post task
        },
        {
            id: 'ryan',
            label: 'Ryan',
            type: 'person',
            attention_needed: false, // Simple check-in
        },
        {
            id: 'claire',
            label: 'Claire',
            type: 'person',
            attention_needed: true, // TopoGlyph astro project unclear
        },
        {
            id: 'alex',
            label: 'Alex',
            type: 'person',
            attention_needed: false, // Philosophy/research tasks
        },
        {
            id: 'david',
            label: 'David',
            type: 'person',
            attention_needed: false, // Simple email response
        },
        {
            id: 'myles',
            label: 'Myles',
            type: 'person',
            attention_needed: false, // Resource sharing
        },

        // Financial tasks - ■ symbols (stable/important)
        {
            id: 'summer_funds',
            label: '$25 Summer Plans',
            type: 'financial',
            amount: '$25',
            priority: 'low',
        },
        {
            id: 'nearterm_funds',
            label: '$4k Near-term Plans',
            type: 'financial',
            amount: '$4k',
            priority: 'high',
        },

        // Project tasks - ◾ symbols (defined tasks)
        {
            id: 'moms_health_stuff',
            label: 'systems to help mom with menopause bullshit (sleep issues in particular)',
            type: 'project',
            priority: 'high',
        },
        {
            id: 'ceo_systems',
            label: 'suite of tools, systems, applications for managing a small business',
            type: 'project',
            priority: 'high',
            // extra details as needed
        },
        {
            id: 'websites_project',
            label: 'Websites {infra, launch}',
            type: 'project',
            priority: 'high',
        },
        {
            id: 'nyc_visit',
            label: 'NYC Visit',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'zwyld_website',
            label: 'zwyld.com',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'index_worker',
            label: 'Worker for index.html',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'portfolio_website',
            label: 'Portfolio Website',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'collaboration_features',
            label: 'Collaboration Features',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'sketchpad_wss',
            label: 'Sketchpad WSS',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'health_module',
            label: 'Health Module',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'hobby_module',
            label: 'Hobby Module',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'cool_shit',
            label: 'Some Cool Shit',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'watercolors',
            label: 'Watercolors',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'averagejoes_ai',
            label: 'averagejoes.ai',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'review_notes',
            label: 'Review Notes',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'extend_site_sections',
            label: 'Extend Site Sections',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'referral_ad_research',
            label: 'Referral Ad Research',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'hasitbeenautomated_com',
            label: 'hasitbeenautomated.com',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'email_system',
            label: 'Email System',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'email_dr_menlo',
            label: 'Email Dr. Menlo',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'tooth_pain_solution',
            label: 'Solution for Tooth Pain',
            type: 'task',
            priority: 'high',
        },
        {
            id: 'teeth_care_routine',
            label: 'Teeth Care Routine',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'virtual_vet_tools',
            label: 'Virtual Vet Tools',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'fix_tooth_pain',
            label: 'Fix Tooth Pain',
            type: 'task',
            priority: 'high',
        },
        {
            id: 'review_texts_grandma',
            label: 'Review Texts (Grandma)',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'make_something_grandma',
            label: 'What Can I Make Her?',
            type: 'task',
            priority: 'medium',
            attention_needed: true,
        },
        {
            id: 'wand_controller',
            label: 'Wand Controller Inspiration',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'check_job_happiness',
            label: 'Check on Job (Is Happy?)',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'wikipedia_everywhere',
            label: 'Wikipedia-everywhere',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'write_blog_post',
            label: 'Write Blog Post (Paper?)',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'get_review_eric',
            label: 'Get Review from Eric',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'check_ryan',
            label: 'See How Ryan is Doing',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'topoglyph_astro',
            label: 'TopoGlyph Astro Shit?',
            type: 'task',
            priority: 'medium',
            attention_needed: true,
        },
        {
            id: 'solidify_philosophy',
            label: 'Solidify Philosophy',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'research_behavior',
            label: 'Research Behavior Stuff',
            type: 'task',
            priority: 'medium',
        },
        {
            id: 'plan_something_alex',
            label: 'Plan Something (Alex)',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'respond_email_david',
            label: 'Respond to Email (David)',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'vimium_extensions',
            label: 'Vimium Extensions',
            type: 'task',
            priority: 'low',
        },
        {
            id: 'tech_resources',
            label: 'Resources for Tech',
            type: 'task',
            priority: 'low',
        },
    ],

    edges: [
        // Myself connections to financial goals
        {
            source: 'myself',
            target: 'summer_funds',
            type: 'responsible_for',
            weight: 1,
        },
        {
            source: 'myself',
            target: 'nearterm_funds',
            type: 'responsible_for',
            weight: 3,
        },

        // Katya connections
        { source: 'katya', target: 'nyc_visit', type: 'related_to', weight: 2 },
        {
            source: 'katya',
            target: 'zwyld_website',
            type: 'responsible_for',
            weight: 2,
        },

        // Steve connection (unclear task)
        { source: 'steve', target: 'cool_shit', type: 'related_to', weight: 1 },

        // Mom connections
        {
            source: 'mom',
            target: 'health_module',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'mom',
            target: 'mom_health_stuff',
            type: 'related_to',
            weight: 2,
        },

        // Dad connections
        {
            source: 'dad',
            target: 'averagejoes_ai',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'dad',
            target: 'ceo_systems',
            type: 'related_to',
            weight: 2,
        },

        // Dr. Menlo
        {
            source: 'dr_menlo',
            target: 'email_dr_menlo',
            type: 'related_to',
            weight: 1,
        },

        // Layla (health/dental)
        {
            source: 'layla',
            target: 'tooth_pain_solution',
            type: 'related_to',
            weight: 3,
        },
        {
            source: 'layla',
            target: 'teeth_care_routine',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'layla',
            target: 'virtual_vet_tools',
            type: 'related_to',
            weight: 1,
        },

        // Maddie
        {
            source: 'maddie',
            target: 'fix_tooth_pain',
            type: 'related_to',
            weight: 3,
        },

        // Grandma
        {
            source: 'grandma',
            target: 'review_texts_grandma',
            type: 'related_to',
            weight: 1,
        },
        {
            source: 'grandma',
            target: 'make_something_grandma',
            type: 'related_to',
            weight: 2,
        },

        // Nece
        {
            source: 'nece',
            target: 'wand_controller',
            type: 'related_to',
            weight: 1,
        },

        // Asta
        {
            source: 'asta',
            target: 'check_job_happiness',
            type: 'related_to',
            weight: 1,
        },

        // Eric
        {
            source: 'eric',
            target: 'wikipedia_everywhere',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'eric',
            target: 'write_blog_post',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'eric',
            target: 'get_review_eric',
            type: 'related_to',
            weight: 1,
        },

        // Ryan
        { source: 'ryan', target: 'check_ryan', type: 'related_to', weight: 1 },

        // Claire
        {
            source: 'claire',
            target: 'topoglyph_astro',
            type: 'related_to',
            weight: 2,
        },

        // Alex
        {
            source: 'alex',
            target: 'solidify_philosophy',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'alex',
            target: 'research_behavior',
            type: 'related_to',
            weight: 2,
        },
        {
            source: 'alex',
            target: 'plan_something_alex',
            type: 'related_to',
            weight: 1,
        },

        // David
        {
            source: 'david',
            target: 'respond_email_david',
            type: 'related_to',
            weight: 1,
        },

        // Myles
        {
            source: 'myles',
            target: 'vimium_extensions',
            type: 'related_to',
            weight: 1,
        },
        {
            source: 'myles',
            target: 'tech_resources',
            type: 'related_to',
            weight: 1,
        },

        // Project relationships
        {
            source: 'myself',
            target: 'websites_project',
            type: 'responsible_for',
            weight: 3,
        },
        {
            source: 'websites_project',
            target: 'portfolio_website',
            type: 'depends_on',
            weight: 2,
        },
        {
            source: 'websites_project',
            target: 'collaboration_features',
            type: 'depends_on',
            weight: 2,
        },
        {
            source: 'websites_project',
            target: 'sketchpad_wss',
            type: 'depends_on',
            weight: 2,
        },
        {
            source: 'websites_project',
            target: 'index_worker',
            type: 'depends_on',
            weight: 2,
        },

        // Task relationships
        {
            source: 'hasitbeenautomated_com',
            target: 'email_system',
            type: 'depends_on',
            weight: 1,
        },
        {
            source: 'tooth_pain_solution',
            target: 'fix_tooth_pain',
            type: 'related_to',
            weight: 2,
        },
    ],

    metadata: {
        layout: 'force',
        showLabels: true,
        showEdgeWeights: false,
    },
}
