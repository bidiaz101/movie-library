import React, { useEffect } from 'react';

function CloudinaryUpload({ preset, handleUpload, buttonText }){
    function generateId() {
        const ending = buttonText.split(' ').map(w => w.toLowerCase()).join('_')
        return `upload_widget_${ending}`
    }

    useEffect(() => {
        window.myWidget = window.cloudinary.createUploadWidget({
            cloudName: "dimt84h2m",
            uploadPreset: preset,
            prepareUploadParams: (cb, params) => {
                params = [].concat(params);
                Promise.all(params.map(body => {
                    return fetch("/uploads/prepare", {
                        method: 'POST',
                        headers: { "Content-Type": 'application/json' },
                        body: JSON.stringify(body)
                    })
                        .then(resp => resp.json())
                }))
                    .then(results => cb(results.length === 1 ? results[0] : results))
            }
        },
        (error, result) => {
            if(!error && result && result.event === 'success'){
                handleUpload && handleUpload(result);
                window.myWidget.close();
            }
        })
        document.getElementById(generateId()).addEventListener(
            "click", 
            function(){
                window.myWidget.open();
            }, 
            false
        )
    }, [preset, handleUpload])

    return (
        <a href='#' id={generateId()}>
            {buttonText}
        </a>
    )
}

export default CloudinaryUpload
