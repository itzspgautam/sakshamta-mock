// pages/index.tsx
import { RootState } from "@/state/store";
import {
  Heading,
  Button,
  GridItem,
  Grid,
  Box,
  Container,
  Center,
  Input,
  Text,
  Flex,
  HStack,
  VStack,
  Table,
  Tr,
  Td,
  Select,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import sqLogo from "@/assets/image/sq-logo.png";

export default function Home() {
  const router = useRouter();

  const { candidate, exam } = useSelector((state: RootState) => state.Auth);
  const { participation } = useSelector((state: RootState) => state.Exam);

  useEffect(() => {
    if (!candidate) {
      router.push("/candidate/login");
      return;
    }
  }, []);

  return (
    <div>
      <Grid
        templateAreas={`"header"
                    "main"
                    "footer"`}
        gridTemplateRows={"75px 1fr 30px"}
        gridTemplateColumns={"1fr"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <Center h="60px" bg="#606a74">
            <Image
              alt="logo"
              src={sqLogo}
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
          </Center>
          <Box
            h="15px"
            bg="#D8D8D8"
            border={"1px solid white"}
            boxShadow={"0px 0px 20px grey"}
          ></Box>
        </GridItem>

        <GridItem
          area={"main"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Container maxW={"4xl"}>
            <Box
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
                Answers Submitted!
              </Center>
              <VStack px="10px" pt={"40px"} pb={"20px"} gap={"25px"}>
                <HStack w="100%">
                  <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"black"}
                    textAlign={"right"}
                    flex={1}
                  >
                    Username :
                  </Text>
                  flex={1}
                  <Text
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                    {candidate?.bsebUniqueid}
                  </Text>
                </HStack>

                <HStack w="100%">
                  <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"black"}
                    textAlign={"right"}
                    flex={1}
                  >
                    Name :
                  </Text>
                  flex={1}
                  <Text
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                    {candidate?.name}
                  </Text>
                </HStack>

                <HStack w="100%">
                  <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"black"}
                    textAlign={"right"}
                    flex={1}
                  >
                    Address :
                  </Text>
                  flex={1}
                  <Text
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                    {exam?.venue}
                  </Text>
                </HStack>

                <HStack w="100%">
                  <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"black"}
                    textAlign={"right"}
                    flex={1}
                  >
                    Exam Code :
                  </Text>
                  flex={1}
                  <Text
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                    {exam?.title}
                  </Text>
                </HStack>

                <HStack
                  fontSize={12}
                  w={"100%"}
                  justifyContent={"center"}
                  gap={5}
                >
                  <HStack>
                    <Text color={"black"}>Un-Attempted:</Text>
                    <Center
                      color={"black"}
                      bg="white"
                      border={"1px solid grey"}
                      h={5}
                      w={6}
                    >
                      {
                        participation?.answers?.filter(
                          (a: any) => a?.status === "UNATT"
                        ).length
                      }
                    </Center>
                  </HStack>
                  <HStack>
                    <Text color={"black"}>Attempted:</Text>
                    <Center
                      color={"black"}
                      bg="#00FF00"
                      border={"1px solid grey"}
                      h={5}
                      w={6}
                    >
                      {
                        participation?.answers?.filter(
                          (a: any) => a?.status === "ATT"
                        ).length
                      }
                    </Center>
                  </HStack>{" "}
                  <HStack>
                    <Text color={"black"}>Tagged:</Text>
                    <Center
                      color={"black"}
                      bg="#FEBF01"
                      border={"1px solid grey"}
                      h={5}
                      w={6}
                    >
                      {
                        participation?.answers?.filter(
                          (a: any) => a?.status === "TAG"
                        ).length
                      }
                    </Center>
                  </HStack>{" "}
                  <HStack>
                    <Text color={"black"}>Tagged & Attempted:</Text>
                    <Center
                      color={"white"}
                      bg="#8A64BF"
                      border={"1px solid grey"}
                      h={5}
                      w={6}
                    >
                      {
                        participation?.answers?.filter(
                          (a: any) => a?.status === "TAGATT"
                        ).length
                      }
                    </Center>
                  </HStack>
                </HStack>

                <HStack mt="2">
                  <Button
                    colorScheme={"yellow"}
                    size={"sm"}
                    fontWeight={"regular"}
                    px="6"
                    bg={"#B9d22c"}
                    onClick={() => router.reload()}
                  >
                    Logout
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Container>
        </GridItem>
        <GridItem bg="white" area={"footer"}></GridItem>
      </Grid>
    </div>
  );
}
