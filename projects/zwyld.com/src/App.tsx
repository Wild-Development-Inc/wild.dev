import React, { useState, useEffect, useRef } from 'react'
import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { io } from 'socket.io-client'

import { UserWrapper } from './components/UserWrapper'

import './App.css'

// 
const clients = {
    'one': {
        position: [0, 0, 0],
        rotation: [0, 0, 0]
    },
    'two': {
        position: [1, 1, 0],
        rotation: [0, 0, 0]
    },
}

export function App() {
    const controlsRef = useRef()

    return (
        <Canvas camera={{ position: [0, 1, -5], near: 0.1, far: 1000 }}>
            <Stats />
            <OrbitControls ref={controlsRef} />
            <gridHelper rotation={[0, 0, 0]} />

            {/* Filter myself from the client list and create user boxes with IDs */}
            {Object.keys(clients)
                .map((client) => {
                    const { position, rotation } = clients[client]
                    return (
                        <UserWrapper
                            key={client}
                            id={client}
                            position={position}
                            rotation={rotation}
                        />
                    )
                })}
        </Canvas>
    )
}
