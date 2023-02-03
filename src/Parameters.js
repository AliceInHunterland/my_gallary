import {
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Input
} from "@chakra-ui/react";
import { useConnect } from "wagmi";
import FileUpload from "./uploadFile";
import {useState} from "react";

export default function SetParametersModal({ mykey, token }) {
  const [{ data, error }, connect] = useConnect();

    const [responseData, setResponseData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const NFT = {
            tokenid: "token_123",
            owner: "John Doe",
            metadata: "Example token",
        };

        fetch("/tokens/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NFT),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setResponseData(data);
            })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
            });
    };



    console.log(token);
  console.log("key", mykey);
  return (

    <>
      <Input placeholder="first" width="auto" />
      <Button
        variant="outline"
        onClick ={handleSubmit}
        // onClick={() => {
        //   console.log("SENT", token);
        //   // closeModal();
        // }}
        w="100%"
      >
        <HStack w="100%" justifyContent="center">
          <Image
            src="/cbw.png"
            alt="Coinbase Wallet Logo"
            width={25}
            height={25}
            borderRadius="3px"
          />
          <Text>Set Params</Text>
        </HStack>
      </Button>
        <FileUpload/>
    </>

  );
}
