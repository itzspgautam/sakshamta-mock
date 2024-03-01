import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

export const MyModal = ({
  children,
  message,
  yesHandle,
}: {
  children: ReactNode;
  message: ReactNode;
  yesHandle: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"#EEEEEE"}
          borderRadius={20}
          border={"4px solid #CCCCCC"}
          overflow={"hidden"}
          p={"0.5"}
          mx={5}
        >
          <Center
            h={"70px"}
            fontSize={24}
            color={"black"}
            fontWeight={"medium"}
            bgImage={"linear-gradient(#DADADA, #CCCCCC)"}
            borderRadius={"16px 16px 0 0"}
          >
            Confirmation
          </Center>
          <Box p={5} fontSize={14} textAlign={'center'}>
            {message}
          </Box>
          <Center mt="1" mb={2} gap={5}>
            <Button
              onClick={yesHandle}
              colorScheme={"yellow"}
              size={"sm"}
              fontWeight={"regular"}
              px="6"
              bg={"#B9d22c"}
            >
              Yes
            </Button>
            <Button
              colorScheme={"yellow"}
              size={"sm"}
              fontWeight={"regular"}
              px="6"
              bg={"#B9d22c"}
              onClick={onClose}
            >
              No
            </Button>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
