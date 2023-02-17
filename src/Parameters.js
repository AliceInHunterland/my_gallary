import React, { useState } from "react";
import {
    Button,
    Text,
    Image,
    Stack,
    useDisclosure,
    Box,
} from "@chakra-ui/react";
import FileUpload from "./uploadFile";
import FileDownload from "./downloadFile";
const server = 'https://7c2a-138-199-59-216.eu.ngrok.io';

export default function SetParametersModal({ mykey, token }) {
    const [tokenid, setTokenid] = useState(token);
    const [scale, setScale] = useState("1 1 1");
    const [pos, setPosition] = useState("");
    const [rot, setRotation] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { tokenid, scale,pos,rot,coordinates };
        const response = await fetch(server + "/tokens/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("Token created successfully");
        } else {
            console.error("Failed to create token");
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Token ID:
                <Text
                >{tokenid}</Text>
            </label>
            <br />
            <label>
                Position:
                <input
                    type="text"
                    value={pos}
                    onChange={(event) => setPosition(event.target.value)}
                />
            </label>
            <br />
            <label>
                Scale:
                <input
                    type="text"
                    value={scale}
                    onChange={(event) => setScale(event.target.value)}
                />
            </label>
            <br />
            <label>
                Rotation:
                <input
                    type="text"
                    value={rot}
                    onChange={(event) => setRotation(event.target.value)}
                />
            </label>
            <br />
            <label>
                Coordinates:
                <input
                    type="text"
                    value={coordinates}
                    onChange={(event) => setCoordinates(event.target.value)}
                />
            </label>
            <br />
            <Button type="submit">Create Token</Button>
        </form>
            <FileUpload token={token} endpoint={'marker'} />
            <FileDownload token={token} endpoint={'marker'} />
            <FileUpload token={token} endpoint={ 'descriptor'}/>
        </>
    );
};

// export default SetParametersModal;
