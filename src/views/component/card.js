import React from 'react'

export default function card(props) {
    let { cards, openModal, setShowModal } = props;
    return (
        <div>
            <div className="card" style={{ width: 300, margin: 20, cursor: "pointer" }} onClick={() => setShowModal(true)}>
                <div className="card-header">
                    <i className="fas fa-play-circle" style={{ color: "#16bf16", fontSize: 24 }}></i>
                    <p>Starting Step</p>
                </div>
                <div className="card-body">Add trigger</div>
                <div className="card-footer" style={{ fontSize: 12, textAlign: "right" }}>The First Step</div>
            </div>
            {cards.map((card, index) => (
                <div className="card" style={{ width: 300, margin: 20, cursor: "pointer" }} key={card.id} onClick={() => openModal(card.id)}>
                    <div className="card-header d-flex flex-column">
                        <i className="fab fa-facebook-messenger" style={{ color: "#18dede", fontSize: 24 }}></i>
                        <span style={{ fontSize: 12 }}>Feedback</span>
                        <p>Send Message</p>
                    </div>
                    <div className="card-body">
                        {card.text}
                        {card.picture ? card.picture.map((pic, index) => {
                            if (pic.imagePreviewUrl) {
                                return (
                                    <div key={index}>
                                        <hr />
                                        <img src={pic.imagePreviewUrl} alt='' />
                                    </div>
                                );
                            }
                        }) : null}
                    </div>
                    <div className="card-footer" style={{ fontSize: 12, textAlign: "right" }}>Next Step</div>
                </div>
            ))}


        </div>
    )
}
