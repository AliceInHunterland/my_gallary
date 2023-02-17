import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const server = 'https://7c2a-138-199-59-216.eu.ngrok.io';

export default function FileDownload({ token, endpoint }) {
    const [hasFile, setHasFile] = useState(false);

    useEffect(() => {
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': "*",
            }
        };

        fetch(`${server}/tokens/${token}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setHasFile(data.marker_file_path !== null);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);


    const handleDownload = () => {
        const downloadUrl = `${server}/download/${endpoint}/${token}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        hasFile && <Button onClick={handleDownload}>Download</Button>
    );
}
