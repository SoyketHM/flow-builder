import React from 'react'

export default function card(props) {
    let { cards, openModal, setShowModal } = props;
    return (
        <div>
            <div className="card" style={{ width: 200, margin: 20, cursor: "pointer" }}>
                <div className="card-header d-flex flex-column">
                    <i className="fab fa-facebook-messenger" style={{ color: "#18dede", fontSize: 24 }}></i>
                    <span style={{ fontSize: 12 }}>Feedback</span>
                    <p>Send Message</p>
                </div>
                <div className="card-footer" style={{ fontSize: 12, textAlign: "right" }}>Next Step</div>
            </div>
        </div>
    )
}
