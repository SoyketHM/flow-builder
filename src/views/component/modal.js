import React from 'react'
import ImageUploader from './imageUploader';

export default function modal(props) {
    let { card, handleChange, setCard, setShowModal, showModal } = props;
    return (
        <div>
            {showModal ? (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { setShowModal(false); setCard({}) }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type='text' placeholder="Enter Your Text ..." value={card.text ? card.text : ''} onChange={(e) => { handleChange(e) }} />
                                <ImageUploader card={card} setCard={setCard} handleChange={handleChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setCard({}) }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div>
    )
}
