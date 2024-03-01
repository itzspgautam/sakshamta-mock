// pages/index.tsx
import { Heading, Button, GridItem, Grid, Box, Center } from "@chakra-ui/react";
import { color } from "framer-motion";
import Link from "next/link";
import sqLogo from "@/assets/image/sq-logo.png";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"75px 1fr 30px"}
        gridTemplateColumns={"1fr"}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <Center h="60px" bg="#606a74">
            <Image alt="logo" src={sqLogo} style={{height:"50px", width:'50px', borderRadius:"50%"}}/>
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
          <Link href={"/candidate/login"}>
            <Button
              colorScheme="black"
              variant={"outline"}
              border={"4px solid #CCCCCC"}
              px={"100px"}
              py={7}
              fontSize={26}
              borderRadius={"20px"}
              bg={"#EEEEEE"}
              color={"black"}
              _hover={{ color: "green" }}
            >
              Start the Exam
            </Button>
          </Link>
        </GridItem>
        <GridItem bg="white" area={"footer"}></GridItem>
      </Grid>
    </div>
  );
}
