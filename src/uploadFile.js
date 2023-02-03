import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) return;

        console.log('Uploading file:', file.name);

        const formData = new FormData();
        formData.append('file', file, 'fuckinf_file');

        fetch('http://0.0.0.0/uploadfile', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
