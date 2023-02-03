import React, { useState } from 'react';
import {
    Button,
    Text,
    Image,
    Stack,
    useDisclosure,
    Box
} from "@chakra-ui/react";

const server = 'https://a549-138-199-59-198.eu.ngrok.io';

export default function FileUpload({ token }) {
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) return;

        console.log('Uploading file:', file.name);

        const formData = new FormData();
        formData.append('file', file, token);

        fetch(server +'/uploadfile', {
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
            <Button type="submit">Upload</Button>
        </form>
    );
};

// export default FileUpload;
