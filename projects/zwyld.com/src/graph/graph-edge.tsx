import React, { useMemo } from 'react'
import { Text } from '@react-three/drei'
import { BufferGeometry, Float32BufferAttribute } from 'three'
import { GraphEdge } from './graph-types'

// Edge type configurations
const getEdgeConfig = (type: string = 'solid') => {
    const configs = {
        solid: { opacity: 0.8, lineWidth: 2 }, // ─ solid connection
        dashed: { opacity: 0.6, lineWidth: 1, dashed: true }, // ~ uncertain connection
        thick: { opacity: 1.0, lineWidth: 4 }, // ═ reinforced connection
    }
    return configs[type as keyof typeof configs] || configs.solid
}

// Edge Component using Line geometry
export const GraphEdgeMesh: React.FC<{
    edge: GraphEdge
    sourcePos: [number, number, number]
    targetPos: [number, number, number]
    showWeights: boolean
}> = ({ edge, sourcePos, targetPos, showWeights }) => {
    const config = getEdgeConfig(edge.type)

    // Create line geometry
    const geometry = useMemo(() => {
        const geom = new BufferGeometry()
        const positions = new Float32BufferAttribute(
            [...sourcePos, ...targetPos],
            3
        )
        geom.setAttribute('position', positions)
        return geom
    }, [sourcePos, targetPos])

    // Calculate midpoint for weight label
    const midpoint = useMemo(
        () =>
            [
                (sourcePos[0] + targetPos[0]) / 2,
                (sourcePos[1] + targetPos[1]) / 2 + 0.2,
                (sourcePos[2] + targetPos[2]) / 2,
            ] as [number, number, number],
        [sourcePos, targetPos]
    )

    return (
        <group>
            <line geometry={geometry}>
                <lineBasicMaterial
                    color={edge.color || 'black'}
                    opacity={config.opacity}
                    transparent
                    linewidth={config.lineWidth}
                />
            </line>
            {showWeights && edge.weight !== undefined && (
                <Text
                    position={midpoint}
                    color="#CCCCCC"
                    anchorX="center"
                    anchorY="middle"
                    fontSize={0.3}
                    outlineWidth={0.01}
                    outlineColor="black"
                >
                    {edge.weight.toFixed(1)}
                </Text>
            )}
        </group>
    )
}
