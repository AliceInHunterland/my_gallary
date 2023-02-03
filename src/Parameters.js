import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
  Input
} from "@chakra-ui/react";
import { useConnect } from "wagmi";

export default function SetParametersModal({ mykey, token }) {
  const [{ data, error }, connect] = useConnect();
  console.log(token);
  console.log("key", mykey);
  return (
    // <Modal key={mykey} isOpen={isOpen} onClose={closeModal} isCentered>
    //   <ModalOverlay />
    //   <ModalContent w="300px">
    //     <ModalHeader>Set Parameters {token}</ModalHeader>
    //     <ModalCloseButton
    //       _focus={{
    //         boxShadow: "none"
    //       }}
    //     />
    //     <ModalBody paddingBottom="1.5rem">
    //       <VStack>
    <>
      <Input placeholder="first" width="auto" />
      <Input placeholder="second" width="auto" />
      <Button
        variant="outline"
        onClick={() => {
          console.log("SENT", token);
          // closeModal();
        }}
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
    </>
    //       </VStack>
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
  );
}
