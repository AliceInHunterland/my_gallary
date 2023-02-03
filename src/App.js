import { useState } from "react";
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Box
} from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import ListNFTbyOwner from "./Listnft";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { truncateAddress } from "./utils";
import { useConnect, useAccount, useNetwork } from "wagmi";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: connectData }] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  return (
    <>
      <Text position="absolute" top={0} right="15px">
        If you're in the sandbox, first "Open in New Window" <span>⬆</span>
      </Text>
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <HStack marginBottom="10px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          >
            Connect your wallet with
          </Text>
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            wagmi
          </Text>
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          >
            !
          </Text>
        </HStack>
        <HStack>
          {!connectData.connected ? (
            <Button onClick={onOpen}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </HStack>
        <VStack justifyContent="center" alignItems="center" padding="10px 0">
          <HStack>
            <Text>{`Connection Status: `}</Text>
            {connectData.connected ? (
              <CheckCircleIcon color="green" />
            ) : (
              <WarningIcon color="#cd5700" />
            )}
          </HStack>

          {!accountData ? (
            <Text>Account: No Account</Text>
          ) : (
            <Tooltip label={accountData.address} placement="right">
              <Text>{`Account: ${truncateAddress(accountData.address)}`}</Text>
            </Tooltip>
          )}
          <Text>{`Network ID: ${
            networkData.chain ? networkData.chain.id : "No Network"
          }`}</Text>
        </VStack>
        {connectData.connected && (
          <HStack justifyContent="flex-start" alignItems="flex-start">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <VStack>
                <Button
                  onClick={() => switchNetwork(network)}
                  isDisabled={!network}
                >
                  Switch Network
                </Button>
                <Select placeholder="Select network" onChange={handleNetwork}>
                  {/* <option value="1">Mainnet</option> */}
                  <option value="5">Goerly</option>
                </Select>
              </VStack>
            </Box>
          </HStack>
        )}

        <Text>{error ? error.message : null}</Text>
      </VStack>
      {connectData.connected && networkData.chain.id === 5 && (
        <HStack justifyContent="flex-start" alignItems="flex-start">
          <ListNFTbyOwner
            networkId={networkData.chain.id}
            ownerAddress={accountData.address}
          />
        </HStack>
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}
