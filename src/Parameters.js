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

const server = 'https://a549-138-199-59-198.eu.ngrok.io';

export default function SetParametersModal({ mykey, token }) {
    const [tokenid, setTokenid] = useState(token);
    const [name, setName] = useState("");
    const [param, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { tokenid, param };
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
                    // type="text"
                    // value={tokenid}
                    // onChange={(event) => setTokenid(event.target.value)}
                >{tokenid}</Text>
            </label>
            {/*<br />*/}
            {/*<label>*/}
            {/*    Name:*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={name}*/}
            {/*        onChange={(event) => setName(event.target.value)}*/}
            {/*    />*/}
            {/*</label>*/}
            <br />
            <label>
                Description:
                <input
                    type="text"
                    value={param}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </label>
            <br />
            <Button type="submit">Create Token</Button>
        </form>
            <FileUpload token={token}/>
        </>
    );
};

// export default SetParametersModal;
