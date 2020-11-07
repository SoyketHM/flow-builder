import React from 'react';

function ImageUploader(props) {
    let { card, setCard, handleChange } = props;

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setCard({
                id: card.id,
                text: card.text,
                picture: [...card.picture, {
                    file: file,
                    imagePreviewUrl: reader.result
                }]
            })
        }
        handleChange(e);

        reader.readAsDataURL(file)
    };

    return (
        <div className="previewComponent" style={{ marginTop: 20 }}>
            <i className="far fa-images" onClick={() => document.getElementById("fileInput").click()} style={{ padding: 10, margin: 10, fontSize: 30, border: 1, borderStyle: "dashed", cursor: "pointer" }}></i>
            <input className="fileInput"
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => handleImageChange(e)} />
            <div className="imgPreview">
                {card.picture ? card.picture.map((pic) => {
                    if (pic.imagePreviewUrl) {
                        return (
                            <div>
                                <hr />
                                <img src={pic.imagePreviewUrl} alt='' />
                            </div>
                        );
                    }
                }) : null}
            </div>
        </div>
    )
}

export default ImageUploader