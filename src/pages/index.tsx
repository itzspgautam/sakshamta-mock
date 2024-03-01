// pages/LandingPage.tsx
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
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
    >
      <Box
        maxWidth="600px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="xl"
        bg="white"
        textAlign="center"
      >
        <Flex justifyContent="center">
          <Image src={wideLogo} alt="Logo" />
        </Flex>
        <Box p={10}>
          <Heading as="h1" size="lg" mb={4} color="red.600">
            Welcome to Saksham
          </Heading>
          <Text fontSize="lg" mb={6} color="gray.700">
            A test app for Bihar Secondary Education Board where users can take
            tests and evaluate their knowledge.
          </Text>

          <HStack justifyContent={"center"}>
            <Link href="/admin">
              <Button variant={"outline"} colorScheme="red">
                Adminstration
              </Button>
            </Link>
            <Link href="/candidate">
              <Button colorScheme="red">Launch Exam Dashboard</Button>
            </Link>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default LandingPage;
