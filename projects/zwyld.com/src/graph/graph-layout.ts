import { GraphEdge, GraphNode } from './graph-types'

// simulate an active astronomical star system,
// with constellations that meaningfully reflect
// my relationships, responsibilities, and todos

// this aesthetic is fucking gorgeous and should
// be incredibly effective as a starting place
// for creating meaningfully navigable

// Auto-layout function for nodes without positions
export const computeLayout = (
    nodes: GraphNode[],
    edges: GraphEdge[],
    layout: string = 'force'
) => {
    switch (layout) {
        case 'circular':
            return nodes.map((node, i) => {
                const angle = (i / nodes.length) * Math.PI * 2
                const radius = Math.max(3, nodes.length * 0.5)
                return {
                    ...node,
                    position:
                        node.position ||
                        ([
                            Math.cos(angle) * radius,
                            0,
                            Math.sin(angle) * radius,
                        ] as [number, number, number]),
                }
            })

        case 'grid':
            const gridSize = Math.ceil(Math.sqrt(nodes.length))
            return nodes.map((node, i) => {
                const x = (i % gridSize) * 3 - gridSize * 1.5
                const z = Math.floor(i / gridSize) * 3 - gridSize * 1.5
                return {
                    ...node,
                    position:
                        node.position ||
                        ([x, 0, z] as [number, number, number]),
                }
            })

        case 'hierarchical':
            // Simple hierarchical layout - assumes first node is root
            return nodes.map((node, i) => {
                if (i === 0) {
                    return {
                        ...node,
                        position:
                            node.position ||
                            ([0, 2, 0] as [number, number, number]),
                    }
                }
                const level = Math.floor((i - 1) / 3) + 1
                const posInLevel = (i - 1) % 3
                return {
                    ...node,
                    position:
                        node.position ||
                        ([(posInLevel - 1) * 4, -level * 2, 0] as [
                            number,
                            number,
                            number
                        ]),
                }
            })

        case 'attention-spiral':
            const sortedNodes = nodes.sort((a, b) => {
                const aScore =
                    (a.attention_needed ? 10 : 0) +
                    (a.priority === 'high'
                        ? 3
                        : a.priority === 'medium'
                        ? 2
                        : 1)
                const bScore =
                    (b.attention_needed ? 10 : 0) +
                    (b.priority === 'high'
                        ? 3
                        : b.priority === 'medium'
                        ? 2
                        : 1)
                return bScore - aScore
            })

            // Golden ratio for natural spiral
            const phi = (1 + Math.sqrt(5)) / 2
            const c = (2 * Math.PI) / (phi * phi)

            sortedNodes.forEach((node, i) => {
                const n = i + 1
                const r = Math.sqrt(n) * 2 // Spiral radius
                const theta = n * c // Spiral angle

                // Attention nodes get pulled toward center with vertical lift
                const attentionMultiplier = node.attention_needed ? 0.5 : 1.0
                const verticalLift = node.attention_needed
                    ? Math.sin(theta * 0.5) * 3
                    : 0

                node.position = [
                    r * Math.cos(theta) * attentionMultiplier,
                    verticalLift,
                    r * Math.sin(theta) * attentionMultiplier,
                ]
            })

            return sortedNodes

        case 'force':
        default:
            // Simple force-directed layout simulation
            return nodes.map((node, i) => {
                if (node.position) return node

                // Find connected nodes for positioning
                const connectedEdges = edges.filter(
                    (e) => e.source === node.id || e.target === node.id
                )

                if (connectedEdges.length === 0) {
                    // Isolated node - random position
                    return {
                        ...node,
                        position: [
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 4,
                            (Math.random() - 0.5) * 10,
                        ] as [number, number, number],
                    }
                }

                // Position based on connections (simplified)
                const angle = (i / nodes.length) * Math.PI * 2
                const radius = 5 + connectedEdges.length
                return {
                    ...node,
                    position: [
                        Math.cos(angle) * radius,
                        Math.sin(i * 0.5) * 2,
                        Math.sin(angle) * radius,
                    ] as [number, number, number],
                }
            })
    }
}
