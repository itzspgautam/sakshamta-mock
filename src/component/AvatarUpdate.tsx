import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";
import getCroppedImg from "@/utils/CropImage";
import Cropper from "react-easy-crop";

interface AvatarUpdateProps {
  children: React.ReactNode;
  setAvatar:any
}

const AvatarUpdate: React.FC<AvatarUpdateProps> = ({ children,setAvatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectImageInput = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null); // Change any to correct type

  const selectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.onload = () => {
        if (typeof render.result === "string") {
          setImage(render.result);
        }
      };
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropAndUpload = useCallback(async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
       setAvatar(croppedImage)
       onClose()
      }
    } catch (e) {
      console.warn(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent overflow={"hidden"}>
          <ModalBody p="0">
            {image ? (
              <Cropper
                image={image}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 5}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{
                  containerStyle: {
                    height: "350px",
                    position: "relative",
                    zIndex: 0,
                  },
                  mediaStyle: {},
                  cropAreaStyle: { borderRadius: "10px" },
                }}
              
              />
            ) : (
              <Box
                h="350px"
                onClick={() => {
                  selectImageInput.current?.click();
                }}
              >
                <Center justifyContent={"center"} h="100%" flexDirection={"column"} _hover={{ bg: "#E6E7E8" }}>
                  <MdUpload fontSize={"150px"} color="#A0AEC0" />
                  <Text color="#A0AEC0">Click Here To Select Image</Text>
                </Center>
              </Box>
            )}
          </ModalBody>
          <Input type="file" ref={selectImageInput} onChange={selectImage} display="none" />
          <ModalFooter>
            {image ? (
              <>
                <Button size="sm" colorScheme="gray" mr={3} onClick={() => setImage(null)}>
                  Select another
                </Button>
                <Button size="sm" variant="solid" colorScheme={"yellow"} onClick={cropAndUpload}>
                  Crop Image
                </Button>
              </>
            ) : (
              <Button size="sm" colorScheme="red" mr={3} onClick={() => onClose()}>
                Cancel
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarUpdate;
