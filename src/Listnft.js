// Setup
import JSON5 from "json5";
import React, { useState } from "react";
import {
  Button,
  Text,
  Image,
  Stack,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import SetParametersModal from "./Parameters";

import { Network, Alchemy } from "alchemy-sdk";
export default function ListNFTbyOwner({ ownerAddress }) {
  const settings = {
    apiKey: "3ZvCS7x0bT-PiKWpvp96BcwbWci2S99z",
    network: Network.ETH_GOERLI
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(Network.ETH_GOERLI);
  const alchemy = new Alchemy(settings);
  const [isShownParameters, setIsShownParameters] = useState(false);
  // Get the latest block
  const [mynft, setmynft] = useState([
    {
      tokensrc:
        "https://ipfs.io/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg",
      tokenAddress: "10xa83ad1563c315c1f088305d3e38fb5a67d00cb8b"
    },
    {
      tokensrc:
        "https://ipfs.io/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg",
      tokenAddress: "20xa83ad1563c315c1f088305d3e38fb5a67d00cb8q"
    }
  ]);
  // Get all outbound transfers for a provided address
  // alchemy.core
  //   .getTokenBalances("0x994b342dd87fc825f66e51ffa3ef71ad818b6893")
  //   .then(console.log);

  console.log(ownerAddress);
  // Get all the NFTs owned by an address

  const handleClickBalance = () => {
    setIsShownParameters((current) => !current);
  };

  React.useEffect(() => {
    alchemy.nft.getNftsForOwner(ownerAddress).then((response) => {
      let mylistNft = [];
      console.log(response);

      for (let i = 0; i < Number(response.totalCount); i++) {
        console.log("HERE", i);

        if (typeof response.ownedNfts[i].metadataError === "undefined") {
          console.log("Inside", i);
          let metadata = JSON5.parse(response.ownedNfts[i].rawMetadata);

          mylistNft.push({
            id: i,
            tokenName: metadata.name,
            tokenid: response.ownedNfts[i].tokenId,
            tokensrc: metadata.image,
            tokenAddress: response.ownedNfts[i].contract.address
          });
        }
      }
      setmynft(mylistNft);
    });
  }, []);

  return (
    <>
      <Stack direction="row">
        {mynft.map((nft, i) => (
          <div className="token-container" key={i}>
            <Box key={i}>
              <Image
                boxSize="150px"
                objectFit="cover"
                src={nft.tokensrc}
                alt="Dan Abramov"
              />
              <Text>{nft.tokenName}</Text>

              <div className="token-container" key={i}>
                {/* <Button onClick={onOpen}>Add parameters</Button> */}
                <SetParametersModal mykey={i} token={nft.tokenAddress}></SetParametersModal>
              </div>
              {/* // <Box> */}
              {/* //   <Input placeholder="first" width="auto" /> */}
              {/* //   <Input placeholder="second" width="auto" /> */}
              {/* // </Box> */}
            </Box>
          </div>
        ))}
      </Stack>
    </>
  );
}
