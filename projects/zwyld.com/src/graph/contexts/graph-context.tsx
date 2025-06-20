import React, { createContext, useContext, useReducer, useMemo } from 'react'

// TopoGlyph Analysis:
// ⦗■3DGraph⦘ → ⊞⊠⊡ (Visual + Kinesthetic + Mathematical integration)
// ⦗■State⦘ ⋱⋰ ⦗■Render⦘ (Hidden connection between state and visual representation)
// ⟲ (Positive feedback loop: interaction → state change → visual update → new interaction)
// ⍥ (Continuous adaptation through user interaction)

// Core insight: 3D interaction is fundamentally about SPATIAL RELATIONSHIPS
// The state should mirror the topological structure of what we're visualizing

interface Node {
    id: string
    position: [number, number, number]
    label: string
    selected?: boolean
    hovered?: boolean
    color?: string
}

interface Edge {
    id: string
    from: string
    to: string
    weight?: number
    selected?: boolean
    color?: string
}

/**
 * Should enable you to define the state for a relatively
 * simple 'application' which is built on top of the graph,
 * the most basic example is an application which just allows
 * you to interact with
 */
interface GraphState {
    selectedNode: string | null
    hoveredNode: string | null
    camera: {
        position: [number, number, number]
        target: [number, number, number]
    }
}

// TopoGlyph Pattern: ⦗■Action⦘ → ⟳ → ⦗■State⦘ (Recursive state transformation)
type GraphAction =
    | { type: 'SELECT_NODE'; id: string; multi?: boolean }
    | { type: 'HOVER_NODE'; id: string | null }
    | { type: 'CLEAR_SELECTION' }

// The state reducer follows TopoGlyph pattern: ⦗■Current⦘ → ▲ → ⦗■Next⦘
function graphReducer(state: GraphState, action: GraphAction): GraphState {
    switch (action.type) {
        case 'CLEAR_SELECTION':
            return { ...state, selectedNodes: new Set() }

        case 'SELECT_NODE':
            const newSelectedNodes = new Set(state.selectedNodes)
            if (action.multi) {
                if (newSelectedNodes.has(action.id)) {
                    newSelectedNodes.delete(action.id)
                } else {
                    newSelectedNodes.add(action.id)
                }
            } else {
                newSelectedNodes.clear()
                newSelectedNodes.add(action.id)
            }
            return { ...state, selectedNodes: newSelectedNodes }

        case 'HOVER_NODE':
            return { ...state, hoveredNode: action.id }

        default:
            return state
    }
}

const GraphContext = createContext<{
    state: GraphState
    dispatch: React.Dispatch<GraphAction>
    actions: {
        addNode: (node: Omit<Node, 'id'>) => void
        selectNode: (id: string, multi?: boolean) => void
        hoverNode: (id: string | null) => void
        dragNode: (id: string, position: [number, number, number]) => void
        clearSelection: () => void
    }
} | null>(null)

export function GraphProvider({ children }: { children: React.ReactNode }) {
    // Initial state follows TopoGlyph pattern: ⦗■Seed⦘ → ⧃ → ⦗■System⦘
    const initialState: GraphState = {
        selectedNodes: new Set(),
        selectedEdges: new Set(),
        hoveredNode: null,
        hoveredEdge: null,
        camera: {
            position: [5, 5, 5],
            target: [0, 0, 0],
        },
        interaction: {
            mode: 'select',
            draggedNode: null,
        },
    }

    const [state, dispatch] = useReducer(graphReducer, initialState)

    // Memoized actions prevent unnecessary re-renders
    // TopoGlyph Pattern: ⟦■Actions⟧ (Protected invariant interface)
    const actions = useMemo(
        () => ({
            addNode: (node: Omit<Node, 'id'>) => {
                const id = `node_${Date.now()}`
                dispatch({ type: 'ADD_NODE', node: { ...node, id } })
            },
            selectNode: (id: string, multi = false) => {
                dispatch({ type: 'SELECT_NODE', id, multi })
            },
            hoverNode: (id: string | null) => {
                dispatch({ type: 'HOVER_NODE', id })
            },
            dragNode: (id: string, position: [number, number, number]) => {
                dispatch({ type: 'DRAG_MOVE', nodeId: id, position })
            },
            clearSelection: () => {
                dispatch({ type: 'CLEAR_SELECTION' })
            },
        }),
        []
    )

    return (
        <GraphContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </GraphContext.Provider>
    )
}

// Custom hook following TopoGlyph pattern: ⋇ (Explicit-tacit interface)
export function useGraph() {
    const context = useContext(GraphContext)
    if (!context) {
        throw new Error('useGraph must be used within GraphProvider')
    }
    return context
}
