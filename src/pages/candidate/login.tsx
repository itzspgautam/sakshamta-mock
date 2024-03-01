// pages/index.tsx
import { candidateLogin } from "@/state/features/AuthSlice";
import { AppDispatch, RootState } from "@/state/store";
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
} from "@chakra-ui/react";
import { color } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sqLogo from "@/assets/image/sq-logo.png";
import Image from "next/image";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { candidate, error, loading, participation } = useSelector(
    (state: RootState) => state.Auth
  );

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChnageUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value.toUpperCase());

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setPassword(numericValue);
  };

  const loginHandle = () => {
    dispatch(candidateLogin({ username, password }));
  };

  useEffect(() => {
    if (candidate) {
      participation
        ? router.push("/candidate/submit-info")
        : router.push("/candidate/detail");
    }
  }, [candidate]);
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
          <Container maxW={"2xl"}>
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
                Candidate Login
              </Center>
              <VStack px="80px" pt={"30px"} pb={"20px"} gap={"10px"}>
                <Text
                  visibility={error ? "visible" : "hidden"}
                  fontSize={"12px"}
                  color={"red"}
                >
                  Error: {error}
                </Text>

                <HStack gap={5} w="100%">
                  <Text fontWeight={"medium"} fontSize={14} flex="1">
                    Username
                  </Text>
                  <Input
                    flex="5"
                    bg="white"
                    type="text"
                    border={"1px solid #B5B5B5"}
                    _focus={{ borderColor: "grey", boxShadow: "none" }}
                    value={username}
                    onChange={handleChnageUsername}
                  ></Input>
                </HStack>

                <HStack gap={5} w="100%">
                  <Box flex="1"></Box>
                  <Text fontWeight={"medium"} fontSize={14} flex="5">
                    Please click on the tab key to move to password field
                  </Text>
                </HStack>

                <HStack gap={5} w="100%">
                  <Text fontWeight={"medium"} fontSize={14} flex="1">
                    Password
                  </Text>
                  <Input
                    type="password"
                    flex="5"
                    bg="white"
                    border={"1px solid #B5B5B5"}
                    _focus={{ borderColor: "grey", boxShadow: "none" }}
                    value={password}
                    onChange={handlePasswordChange}
                  ></Input>
                </HStack>

                <HStack mt="2">
                  <Button
                    colorScheme={"yellow"}
                    size={"sm"}
                    fontWeight={"regular"}
                    px="6"
                    bg={"#B9d22c"}
                    onClick={() => loginHandle()}
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                  <Link href={"/candidate/welcome"}>
                    <Button
                      colorScheme={"yellow"}
                      size={"sm"}
                      fontWeight={"regular"}
                      px="6"
                      bg={"#B9d22c"}
                    >
                      Back
                    </Button>
                  </Link>
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
