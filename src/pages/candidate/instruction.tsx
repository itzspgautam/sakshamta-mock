// pages/index.tsx
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
import sqLogo from "@/assets/image/sq-logo.png";
import Image from "next/image";

import hinIns from "@/assets/image/hindi-ins.jpeg";
import engIns from "@/assets/image/eng-ins.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { loading, error, exam, questions, answers, language, participation } =
    useSelector((state: RootState) => state.Exam);
  const { candidate } = useSelector((state: RootState) => state.Auth);

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
                    `}
        gridTemplateRows={"75px 1fr"}
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
          <Container maxW={"5xl"}>
            <Box
              bg={"#EEEEEE"}
              borderRadius={20}
              border={"4px solid #CCCCCC"}
              overflow={"hidden"}
              p={"0.5"}
              mx={5}
              h={"85vh"}
            >
              <Center
                h={"12%"}
                fontSize={24}
                color={"black"}
                fontWeight={"medium"}
                bgImage={"linear-gradient(#DADADA, #CCCCCC)"}
                borderRadius={"16px 16px 0 0"}
              >
                Candidate Instructions
              </Center>
              <Box
                justifyContent={"flex-end"}
                h="76%"
                overflow={"scroll"}
                bg={"#EFEFEF"}
              >
                <Image
                  src={
                    language === "Hindi"
                      ? hinIns
                      : language === "English"
                      ? engIns
                      : hinIns
                  }
                  alt="Hindi Instruction"
                  style={{ width: "100%" }}
                />
              </Box>
              <Center>
                <Link href={"/candidate/test"}>
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
              </Center>
            </Box>
          </Container>
        </GridItem>
      </Grid>
    </div>
  );
}
