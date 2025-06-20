import React from 'react'
import { Text } from '@react-three/drei'
import { BoxBufferGeometry, MeshNormalMaterial } from 'three'

const buildNormalMaterial = () => {
    return new MeshNormalMaterial()
}

/**
 * Wrapper for rendering a box that represents a user,
 * shows their position and rotation (orientation of camera).
 */
export const UserWrapper = ({ position, rotation, id }) => {
    return (
        <mesh
            position={position}
            rotation={rotation}
            geometry={new BoxBufferGeometry()}
            material={buildNormalMaterial()}
        >
            {/* Optionally show the ID above the user's mesh */}
            <Text
                position={[0, 1.0, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {id}
            </Text>
        </mesh>
    )
}

