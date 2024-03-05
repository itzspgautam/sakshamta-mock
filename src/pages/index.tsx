// pages/LandingPage.tsx
import { Flex, Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import wideLogo from "@/assets/image/logo-wide.png";
import Link from "next/link";

const LandingPage = () => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, #C10F0B, #D32714)"
      p={2}
    >
      <Box
        maxWidth={["100%", "50%"]} // Adjusted for smaller screens
        borderWidth={1}
        borderRadius={8}
        boxShadow="xl"
        bg="white"
        textAlign="center"
      >
        <Flex justifyContent="center" w={"100%"}>
          <Image
            src={wideLogo}
            alt="Logo"
            width={300}
            style={{ width: "100%" }}
          />{" "}
          {/* Adjusted image width and height */}
        </Flex>
        <Box pt={6} pb={4}>
          <Heading as="h1" size="lg" mb={2} color="red.600">
            Welcome to Saksham
          </Heading>
          <Text fontSize="md" mb={4} color="gray.700">
            A test app for Bihar Secondary Education Board where users can take
            tests and evaluate their knowledge.
          </Text>

          <HStack justifyContent={"center"} spacing={2}>
            <Link href="/admin">
              <Button variant={"outline"} size="sm" colorScheme="red">
                Adminstration
              </Button>
            </Link>
            <Link href="/candidate">
              <Button size="sm" colorScheme="red">
                Launch Exam Dashboard
              </Button>
            </Link>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default LandingPage;
