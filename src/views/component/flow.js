import React, { useState, useEffect } from 'react'
import ReactFlow, {
    isEdge,
    removeElements,
    addEdge,
    Handle,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';

const initialElements = [
    {
        id: '1',
        type: 'default',
        data: {
            label: (
                <>
                    <Handle
                        type="target"
                        position="top"
                        style={{ background: '#555' }}
                        onConnect={(params) => console.log('handle onConnect', params)}
                    />
                    <div className="card" style={{ width: 200, margin: 20, cursor: "pointer" }}>
                        <div className="card-header">
                            <i className="fas fa-play-circle" style={{ color: "#16bf16", fontSize: 24 }}></i>
                            <p>Starting Step</p>
                        </div>
                        <div className="card-body">Add trigger</div>
                        <div className="card-footer" style={{ fontSize: 12, textAlign: "right" }}>The First Step</div>
                    </div>
                    <Handle
                        type="source"
                        position="right"
                        id="a"
                        style={{ top: 10, background: '#555' }}
                    />
                </>
            ),
        },
        position: { x: 250, y: 0 },
        style: { width: 265 },
    },
    {
        id: '2',
        data: {
            label: (
                <>
                    <Handle
                        type="target"
                        id="t2"
                        style={{ background: '#555' }}
                    />
                    This is <strong>node 2</strong>
                    <Handle
                        type="source"
                        id="s2"
                        style={{ background: '#555' }}
                    />
                </>
            ),
        },
        position: { x: 50, y: 100 },
    },
    {
        id: '3',
        data: {
            label: (
                <>
                    This one has a <strong>custom style</strong>
                </>
            ),
        },
        position: { x: 400, y: 300 },
        style: {
            background: '#D6D5E6',
            color: '#333',
            border: '1px solid #222138',
            width: 180,
        },
    },
    {
        id: '4',
        position: { x: 250, y: 400 },
        data: {
            label: 'Another default node 1',
        },
        sourcePosition: 'right',
    },
    {
        id: '5',
        position: { x: 300, y: 500 },
        data: {
            label: 'Another default node 2',
        },
        targetPosition: 'top',
        sourcePosition: 'right',
    },
    {
        id: '6',
        position: { x: 300, y: 600 },
        data: {
            label: (
                <>
                    <Handle
                        type="target"
                        id="6s"
                        style={{ background: '#555' }}
                    />
                    This is a <strong>new node</strong>
                    <Handle
                        type="target"
                        id="6t"
                        style={{background: '#555' }}
                    />
                </>
            ),
        },
    }
];
const graphStyles = { width: '100%', height: '700px' };

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};
function Flow() {
    const [elements, setElements] = useState(initialElements);
    
    const onElementsRemove = (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    

    return (
        <ReactFlow
            elements={elements}
            style={graphStyles}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            snapToGrid={true}
            snapGrid={[15, 15]}
        >
            <MiniMap
                nodeStrokeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'default') return '#1a192b';
                    return '#eee';
                }}
                nodeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    return '#fff';
                }}
                nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
        </ReactFlow>
    );
}

export default Flow