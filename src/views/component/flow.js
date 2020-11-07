import React, { useState, useEffect } from 'react'
import Card from './card';
import Modal from './modal';
import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';

let count = 2;

const graphStyles = { width: '100%', height: '700px' };

const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
};
function Flow() {
    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState([{ id: 1, text: 'Add Text', picture: [] }]);
    const [card, setCard] = useState({});
    
    const openModal = (id) => {
        let text = '';
        let picture = [];
        let index = cards.findIndex(el => el.id === id);
        if (index !== -1) {
            text = cards[index].text;
            picture = cards[index].picture;
        }
        setCard({ id, text, picture });
        setShowModal(!showModal)
    }
    const initialElements = [
        {
            id: '1',
            type: 'default',
            data: {
                label: (
                    <>
                        <div className="card" style={{ width: 200, margin: 20, cursor: "pointer" }} onDoubleClick={() => setShowModal(true)}>
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
                        <Card cards={cards} openModal={openModal} setShowModal={setShowModal} />
                    </>
                ),
            },
            position: { x: 350, y: 100 },
            style: { width: 265 },
        },
    ];    
    const [elements, setElements] = useState(initialElements);

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const addcard = () => {
        setElements([...elements, {
            id: count + 1,
            data: {
                label: (
                    <>
                        <Card cards={cards} openModal={openModal} setShowModal={setShowModal} />
                    </>
                ),
            },
            position: { x: Math.floor(Math.random() * Math.floor(700)), y: Math.floor(Math.random() * Math.floor(600)) },
            style: { width: 265 },
        }])
        count++;
    }
    const handleChange = (e) => {
        let newCard = { id: card.id, picture: card.picture };

        if (e.target.type === 'text') newCard.text = e.target.value;
        else newCard.text = card.text;

        setCard(newCard);
        let index = cards.findIndex(el => el.id === card.id);

        if (index !== -1) {
            if (e.target.type === 'text') {
                cards[index].text = e.target.value;
            } else {
                let reader = new FileReader();
                reader.onloadend = () => {
                    cards[index].picture = [...card.picture, {
                        file: e.target.files[0],
                        imagePreviewUrl: reader.result
                    }]
                }
                reader.readAsDataURL(e.target.files[0])
            }
        }

    }


    return (
        <>
            <i className="fas fa-plus-circle" style={{ color: "#008000", fontSize: 50, margin: 20, cursor: "pointer" }} onClick={addcard}></i>
            <Modal card={card} handleChange={handleChange} setShowModal={setShowModal} setCard={setCard} showModal={showModal}></Modal>
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