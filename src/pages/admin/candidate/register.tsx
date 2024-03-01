import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Center,
  Flex,
  Container,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import AvatarUpdate from "@/component/AvatarUpdate";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import SignUpdate from "@/component/SignUpdate";
import { CandidateInterface } from "@/interface/CandidateInterface";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import AppConfig from "@/config/appCongif";
import { ExamInterface } from "@/interface/ExamInterface";
import { useRouter } from "next/router";

const RegisterCandidate: React.FC = () => {
  const router = useRouter();
  const { admin, error, loading, token } = useSelector(
    (state: RootState) => state.AdminAuth
  );
  const [exams, setExams] = useState<ExamInterface[]>([]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [exam, setExam] = useState<any>("");
  const [avatar, setAvatar] = useState<string>("");
  const [sign, setSign] = useState<string>("");

  const [photoPerc, setPhotoPerc] = useState<number>(0);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value.toUpperCase());
  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDob(event.target.value);
  const handleExamChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setExam(event.target.value);

  const handleSubmit = async () => {
    try {
  
      if (!name || !username || !dob || !exam) {
        throw new Error("All fields are required");
      }

      if (!avatar || !sign) {
        throw new Error("Both photo and signature are required.");
      }

      const responseAv = await fetch(avatar);
      const responseSign = await fetch(sign);

      const avatarBolb = await responseAv.blob();
      const signBlob = await responseSign.blob();


      //avatar upload
      const photoFormData = new FormData();
      photoFormData.append("file", avatarBolb, `${name}_${username}_.jpg`); // Specify custom filename here
      photoFormData.append("upload_preset", `${AppConfig.CL_IMAGE_PRESET}`);

      const photoConfig = {
        onUploadProgress: function (progressEvent: any) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPhotoPerc(percentCompleted);
        },
      };
      const imageUpload = await axios.post(
        `${AppConfig?.CLOUDINARY_API}`,
        photoFormData,
        photoConfig
      );

      //sign upload
      const signFormData = new FormData();
      signFormData.append("file", signBlob, `${name}_${username}_.jpg`); // Specify custom filename here
      signFormData.append("upload_preset", `${AppConfig.CL_SIGN_PRESET}`);

      const signConfig = {
        onUploadProgress: function (progressEvent: any) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPhotoPerc(percentCompleted);
        },
      };
      const signUpload = await axios.post(
        `${AppConfig?.CLOUDINARY_API}`,
        signFormData,
        signConfig
      );
      console.log(imageUpload, signUpload);
      const registerdata: any = {
        name,
        bsebUniqueid: username,
        dob,
        photo: imageUpload?.data?.secure_url,
        sign: signUpload?.data?.secure_url,
        exam,
      };
      const { data } = await axios.post(
        `${AppConfig.API}/api/admin/candidate/register`,
        registerdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("candidate registered!");
      router.push("/admin/candidate");
    } catch (error:any) {
      let message = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      alert(message);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.post(
        `${AppConfig.API}/api/admin/exam/get-exams`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExams(response.data?.exams);
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      alert(message);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);
  return (
    <Box bg="cyan.100" height={"100vh"}>
      <Box bg="black" p={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="./">
            <Button colorScheme="cyan" variant="outline">
              Back
            </Button>
          </Link>
          <Heading color="white" size="md">
            Register Candidate
          </Heading>
          <Link href="/admin/candidate">
            <Button colorScheme="red">View candidate</Button>
          </Link>
        </Flex>
      </Box>

      <Container bg="white" my={5} p={4} borderRadius={"md"}>
        <HStack gap={4} alignItems={"flex-start"}>
          <Box flex={2}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel fontSize={"sm"}>Name</FormLabel>
                <Input
                  size={"sm"}
                  placeholder="Enter name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel fontSize={"sm"}>Username</FormLabel>
                <Input
                  size={"sm"}
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormControl>
              <FormControl id="dob" isRequired>
                <FormLabel fontSize={"sm"}>Date of Birth</FormLabel>
                <Input
                  size={"sm"}
                  type="date"
                  value={dob}
                  onChange={handleDobChange}
                />
              </FormControl>
              <FormControl id="exam" isRequired>
                <FormLabel fontSize={"sm"}>Exam</FormLabel>
                <Select
                  size={"sm"}
                  placeholder="Select exam"
                  value={exam}
                  onChange={handleExamChange}
                >
                  {exams &&
                    exams?.map((e) => (
                      <option key={e?._id} value={e?._id}>
                        {e?.title} ({e?.duration}min)
                      </option>
                    ))}
                </Select>
              </FormControl>
              <Button size={"sm"} colorScheme="blue" onClick={handleSubmit}>
                Register
              </Button>
            </VStack>
          </Box>
          <Box flex={1} h="100%">
            <Box bg="teal.100" p={1} borderRadius={"lg"}>
              <AvatarUpdate setAvatar={setAvatar}>
                <Center
                  aspectRatio={"4/5"}
                  borderRadius={"md"}
                  overflow={"hidden"}
                  border={"2px dashed white"}
                  flexDir={"column"}
                >
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={"Avatar"}
                      height={"100%"}
                      width={"100%"}
                    />
                  ) : (
                    <>
                      <FaUpload color="rgba(0,0,0,.2)" size={50} />
                      <Text color="rgba(0,0,0,.4)">Upload Photo</Text>
                    </>
                  )}
                </Center>
                {avatar && (
                  <Button size={"sm"} w="100%" bg={"transparent"}>
                    Change
                  </Button>
                )}
              </AvatarUpdate>
            </Box>
            <Box bg="teal.100" p={1} borderRadius={"lg"} mt="2">
              <SignUpdate setSign={setSign}>
                <Center
                  aspectRatio={"2/1"}
                  borderRadius={"md"}
                  overflow={"hidden"}
                  border={"2px dashed white"}
                  flexDir={"column"}
                >
                  {sign ? (
                    <Image
                      src={sign}
                      alt={"Avatar"}
                      height={"100%"}
                      width={"100%"}
                    />
                  ) : (
                    <>
                      <FaUpload color="rgba(0,0,0,.2)" size={50} />
                      <Text color="rgba(0,0,0,.4)">Upload Sign</Text>
                    </>
                  )}
                </Center>
                {sign && (
                  <Button size={"sm"} w="100%" mt={2}>
                    Change
                  </Button>
                )}
              </SignUpdate>
            </Box>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default RegisterCandidate;
