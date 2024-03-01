// pages/index.tsx
import { fetchQuestions, setLang } from "@/state/features/ExamSlice";
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
  Table,
  Tr,
  Td,
  Select,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, exam, questions, answers, language, participation } =
    useSelector((state: RootState) => state.Exam);
  const { candidate } = useSelector((state: RootState) => state.Auth);

  const languageHandle = (e: any) => {
    dispatch(setLang(e.target.value));
  };

  useEffect(() => {
    if (!candidate) {
      router.push("/candidate/login");
      return;
    }
    if (exam && questions) {
      return;
    }
    dispatch(fetchQuestions());
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
          <Box h="60px" bg="#606a74"></Box>
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
                Candidate Detail
              </Center>
              <VStack px="80px" pt={"40px"} pb={"20px"} gap={"25px"}>
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

                <HStack w="100%">
                  <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"black"}
                    textAlign={"right"}
                    flex={1}
                  >
                    Duration :
                  </Text>
                  flex={1}
                  <Text
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                    {exam?.duration} min
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
                    Medium :
                  </Text>
                  flex={1}
                  <Box
                    fontSize={12}
                    fontWeight={"regular"}
                    textAlign={"left"}
                    flex={1}
                  >
                   <select onChange={languageHandle}>
                      <option
                        value="Hindi"
                        selected={language === "Hindi" ? true : false}
                      >
                        Hindi
                      </option>
                      <option
                        value="English"
                        selected={language === "English" ? true : false}
                      >
                        English
                      </option>
                    </select>
                  </Box>
                </HStack>

                <HStack mt="2">
                  <Link href={"/candidate/instruction"}>
                    <Button
                      colorScheme={"yellow"}
                      size={"sm"}
                      fontWeight={"regular"}
                      px="6"
                      bg={"#B9d22c"}
                    >
                      Confirm
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
