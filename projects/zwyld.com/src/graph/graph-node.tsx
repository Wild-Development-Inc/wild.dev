import React, { useMemo, useState } from 'react'
import { GraphNode } from './graph-types'
import { Text } from '@react-three/drei'
import * as three from 'three'

// Node type materials following TopoGlyph symbols
const getNodeMaterial = (type: string = 'default') => {
    const materials = {
        default: new three.MeshLambertMaterial(),
        hovered: new three.MeshPhysicalMaterial(),
    }
    return materials[type as keyof typeof materials] || materials.default
}

const getNodeSize = (priority: number | string | undefined) => {
    return 0.5
}

const getNodeGeometry = (type: string = 'task') => {
    const geometries = {
        default: new three.SphereGeometry(),
        project: new three.SphereGeometry(),
        task: new three.ConeGeometry(),
    }
    return geometries[type as keyof typeof geometries] || geometries.default
}

// Individual Node Component
export const GraphNodeMesh: React.FC<{ node: GraphNode; showLabels: boolean }> =
    ({ node, showLabels }) => {
        const geometry = getNodeGeometry(node.type)
        const size = getNodeSize(node.priority)
        const material = getNodeMaterial(node.type)

        return (
            <group>
                <mesh
                    position={node.position || [0, 0, 0]}
                    rotation={[0, 0, 0]}
                    geometry={geometry}
                    material={material}
                >
                    {showLabels && (node.label || node.id) && (
                        <Text
                            position={[0, size + 0.5, 0]}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            fontSize={0.4}
                            outlineWidth={0.02}
                            outlineColor="black"
                        >
                            {node.label || node.id}
                        </Text>
                    )}
                </mesh>
            </group>
        )
    }
