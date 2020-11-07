import React, { useState, useEffect } from 'react'
import Card from './card';
import ReactFlow, {
    isEdge,
    removeElements,
    addEdge,
    Handle,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';

let count = 2;
const initialElements = [
    {
        id: '1',
        type: 'default',
        data: {
            label: (
                <>
                    <div className="card" style={{ width: 200, margin: 20, cursor: "pointer" }}>
                        <div className="card-header">
                            <i className="fas fa-play-circle" style={{ color: "#16bf16", fontSize: 24 }}></i>
                            <p>Starting Step</p>
                        </div>
                        <div className="card-body">Add trigger</div>
                        <div className="card-footer" style={{ fontSize: 12, textAlign: "right" }}>The First Step</div>
                    </div>
                </>
            ),
        },
        position: { x: 10, y: 100 },
        style: { width: 265 },
    },
    {
        id: '2',
        data: {
            label: (
                <>
                    <Card />
                </>
            ),
        },
        position: { x: 350, y: 100 },
        style: { width: 265 },
    },
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
    const addcard = () => {
        setElements([...elements, {
            id: count+1,
            data: {
                label: (
                    <>
                        <Card />
                    </>
                ),
            },
            position: { x: Math.floor(Math.random() * Math.floor(700)), y: Math.floor(Math.random() * Math.floor(600)) },
            style: { width: 265 },
        }])
        count++;
    }


    return (
        <>
            <i className="fas fa-plus-circle" style={{ color: "#008000", fontSize: 50, margin: 20, cursor: "pointer" }} onClick={addcard}></i>
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
        </>
    );
}

export default Flow