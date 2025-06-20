// TopoGlyph Pattern: ⦾Node → ⋱⋰ → ⦾Node (graph structure with connections)

export interface GraphNode {
    id: string
    position?: [number, number, number]
    label?: string
    type?: 'default' | 'primary' | 'secondary' | 'highlighted'
    size?: number
    color?: string
    priority?: number
    attention_needed?: boolean
}

export interface GraphEdge {
    source: string
    target: string
    weight?: number
    type?: 'solid' | 'dashed' | 'thick'
    color?: string
}

export interface GraphMetadata {
    layout?: 'force' | 'circular' | 'grid' | 'hierarchical'
    nodeSpacing?: number
    showLabels?: boolean
    showEdgeWeights?: boolean
    animated?: boolean
}

export interface GraphProps {
    nodes: GraphNode[]
    edges: GraphEdge[]
    metadata?: GraphMetadata
}
