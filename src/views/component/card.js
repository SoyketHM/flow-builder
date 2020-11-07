import React from 'react'

export default function card(props) {
    let { cards, openModal, setShowModal } = props;
    return (
        <div>
            {cards.map((card, index) => (
                <div className="card" style={{ width: 200, margin: 20, cursor: "pointer" }} key={card.id} onClick={() => openModal(card.id)}>
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
                                        <img src={pic.imagePreviewUrl} alt=''style={{ width: 150, height: 150 }} />
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
