import React, { useMemo, useState } from 'react'

import { GraphProps } from './graph-types'
import { GraphEdgeMesh } from './graph-edge'
import { GraphNodeMesh } from './graph-node'
import { computeLayout } from './graph-layout'

export const Graph: React.FC<GraphProps> = ({
    nodes,
    edges,
    metadata = {},
}) => {
    const {
        layout = 'force',
        showLabels = true,
        showEdgeWeights = false,
        animated = false,
    } = metadata

    // Compute node positions using layout algorithm
    const layoutNodes = useMemo(() => {
        return computeLayout(nodes, edges, layout)
    }, [nodes, edges, layout])

    // Create position lookup for edges
    const nodePositions = useMemo(() => {
        const positions: Record<string, [number, number, number]> = {}
        layoutNodes.forEach((node) => {
            positions[node.id] = node.position!
        })
        return positions
    }, [layoutNodes])

    // Filter valid edges (both source and target nodes exist)
    const validEdges = useMemo(() => {
        return edges.filter(
            (edge) => nodePositions[edge.source] && nodePositions[edge.target]
        )
    }, [edges, nodePositions])

    return (
        <group>
            {/* Render all edges first (so they appear behind nodes) */}
            {validEdges.map((edge, index) => (
                <GraphEdgeMesh
                    key={`edge-${edge.source}-${edge.target}-${index}`}
                    edge={edge}
                    sourcePos={nodePositions[edge.source]}
                    targetPos={nodePositions[edge.target]}
                    showWeights={showEdgeWeights}
                />
            ))}

            {/* Render all nodes */}
            {layoutNodes.map((node) => (
                <GraphNodeMesh
                    key={node.id}
                    node={node}
                    showLabels={showLabels}
                />
            ))}
        </group>
    )
}
