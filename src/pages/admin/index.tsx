// pages/admin/AdminLogin.tsx

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  useColorModeValue,
  Container,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { adminLogin } from "@/state/features/AdminAuthSlice";
import { useRouter } from "next/router";
import sqLogo from "@/assets/image/sq-logo.png";
import Image from "next/image";

const AdminLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { admin, error, loading } = useSelector(
    (state: RootState) => state.AdminAuth
  );

  const handleLogin = () => {
    dispatch(adminLogin({ email, password}));
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const formBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    if (admin) router.push("/admin/dashboard");
  }, [admin]);

  return (
    <Flex align="center" justify="center" h="100vh" bg={bgColor}>
      <Container
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={formBgColor}
      >
        <Flex justify="center">
          <Image src={sqLogo} alt="Admin Logo" height={100}  />
        </Flex>
        <Box my={4} textAlign="center">
          <Heading size="lg" color="red.500">
            Admin Portal
          </Heading>
        </Box>
        <Box mt={8}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Text
            visibility={error ? "visible" : "hidden"}
            mt={2}
            fontSize={"12px"}
            color={"red"}
          >
            Error: {error}
          </Text>

          <Button
            isLoading={loading}
            colorScheme="red"
            mt={6}
            onClick={handleLogin}
            w="full"
          >
            Login
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default AdminLogin;
