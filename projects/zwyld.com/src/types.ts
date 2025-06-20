import * as THREE from 'three'

// ========================================
// TopoGlyph Symbol Mappings
// ========================================

// Spatial Representation Elements
// ⟨x,y,z⟩ → THREE.Vector3
// ⟨θ,φ,ψ⟩ → THREE.Euler
// ⟨s⟩ → number (uniform scale)
// ⟨sx,sy,sz⟩ → THREE.Vector3 (non-uniform scale)
export type Position3D = THREE.Vector3
export type Rotation3D = THREE.Euler
export type Scale3D = THREE.Vector3 | number

// Geometric Primitives
// ◾ → Box, ● → Sphere, ▲ → Cone, ◆ → Custom Mesh, □ → Plane
export type PrimitiveType = 'box' | 'sphere' | 'cone' | 'plane' | 'custom'

// Transformations
// ⊕T → Translation, ⊕R → Rotation, ⊕S → Scale, ⊕M → Combined Matrix
export interface Transform {
    position: Position3D
    rotation: Rotation3D
    scale: Scale3D
}

// ========================================
// Core Data Structures
// ========================================

// ⦾ → Scene Graph Node
export interface SceneObject {
    id: string
    type: PrimitiveType
    transform: Transform
    material: {
        color: string
        wireframe?: boolean
    }
    physics?: {
        mass: number
        velocity: THREE.Vector3
        gravity: boolean
    }
    behaviors: Behavior[]
    animations: Animation[]
}

// Behavior System: Object ← Behavior⟨InputType⟩ → Operation → UpdateRule
export interface Behavior {
    inputType: InputType
    trigger: string | ((input: InputEvent) => boolean)
    operation: 'translate' | 'rotate' | 'scale' | 'material'
    parameters: any
    updateRule: 'continuous' | 'onPress' | 'onRelease' | 'toggle'
}

// Animation System: Object ← Animation⟨Function⟩ → Parameters → Duration/Loop
export interface Animation {
    function: 'rotate' | 'translate' | 'scale' | 'bounce' | 'wave'
    parameters: any
    duration?: number
    loop: boolean
    startTime: number
}

// 🌐Initialize → Sandbox State
export interface SandboxState {
    objects: SceneObject[]
    camera: {
        position: Position3D
        target: Position3D
    }
    lights: {
        position: Position3D
        intensity: number
    }[]
    physics: {
        enabled: boolean
        gravity: THREE.Vector3
    }
    time: number
}

// Interactive Behavior Elements
// ⌨ → Keyboard, 🖱 → Mouse, 👆 → Touch, ⌚ → Time
export type InputType = 'keyboard' | 'mouse' | 'touch' | 'time'

// ⟵ → Input capture, ⟶ → Output trigger, ⥁ → State update, ⟳ → Loop, ⟐ → Branch
export interface InputEvent {
    type: InputType
    key?: string
    position?: [number, number]
    delta?: number
}
