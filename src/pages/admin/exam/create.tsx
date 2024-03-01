import { QuestionImport } from "@/component/QuestionImport";
import { CretaeExam, clearNewExam } from "@/state/features/ExamSlice";
import { AppDispatch, RootState } from "@/state/store";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Badge,
  HStack,
  Center,
  VStack,
  Flex,
  InputGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AnyARecord } from "dns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ManageExam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { admin } = useSelector((state: RootState) => state.AdminAuth);

  const {
    new: newExam,
    error,
    loading,
  } = useSelector((state: RootState) => state.Exam);

  const [question, setQuestion] = useState<any>();
  const [questionError, setQuestionError] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [venue, setVenue] = useState<string>("");
  const [doe, setDoe] = useState<any>("");

  const handleSubmit = () => {
    dispatch(
      CretaeExam({
        newExam: { title, duration, venue, examDate: doe },
        question,
      })
    );
  };

  useEffect(() => {
    console.log("question", question);
  }, [setQuestion]);

  useEffect(() => {
    if (!admin) router.push("/admin");
  }, [admin]);

  useEffect(() => {
    if (newExam?.question) router.push("/admin/exam");
  }, [newExam?.question]);

  useEffect(() => {
    dispatch(clearNewExam());
  }, []);

  return (
    <Box>
      <Box bg="black" p={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="./">
            <Button colorScheme="cyan" variant="outline">
              Back
            </Button>
          </Link>
          <Heading color="white" size="md">
            Create Exam
          </Heading>
          <Link href="/admin/exam/create">
            <Button colorScheme="red">View All Exams</Button>
          </Link>
        </Flex>
      </Box>

      <HStack>
        <Box
          borderWidth="1px"
          backgroundColor="orange.200"
          w={"75vw"}
          overflow={"auto"}
        >
          {question ? (
            <TableContainer
              height="100vh"
              overflow={"scroll"}
              whiteSpace="nowrap"
            >
              <Table variant="striped" colorScheme="orange" size={"sm"}>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead bg={"black"}>
                  <Tr>
                    <Th color={"white"} rowSpan={2}>
                      Sl
                    </Th>
                    <Th color={"white"} rowSpan={2}>
                      Question
                    </Th>
                    <Th
                      color={"white"}
                      colSpan={4}
                      textAlign="center"
                      border={"none"}
                    >
                      Options
                    </Th>
                    <Th color={"white"} rowSpan={2} isNumeric>
                      Answer
                    </Th>
                  </Tr>
                  <Tr>
                    <Th color={"white"}>A</Th>
                    <Th color={"white"}>B</Th>
                    <Th color={"white"}>C</Th>
                    <Th color={"white"}>D</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {question &&
                    question.map((q: any, i: number) => (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td
                          fontSize={11}
                          fontWeight={"medium"}
                          maxW="600px"
                          pr={5}
                          isTruncated
                        >
                          {q?.question?.en}
                          <br />
                          {q?.question?.hi}
                        </Td>
                        <Td fontSize={11} fontWeight={"medium"} isTruncated>
                          <Badge colorScheme={"red"}>A</Badge>{" "}
                          {q?.options[0]?.option_en}
                          <br />
                          {q?.options[0]?.option_hi}
                        </Td>

                        <Td fontSize={11} fontWeight={"medium"} isTruncated>
                          <Badge colorScheme={"red"}>B</Badge>{" "}
                          {q?.options[1]?.option_en}
                          <br />
                          {q?.options[1]?.option_hi}
                        </Td>

                        <Td fontSize={11} fontWeight={"medium"} isTruncated>
                          <Badge colorScheme={"red"}>C</Badge>{" "}
                          {q?.options[2]?.option_en}
                          <br />
                          {q?.options[2]?.option_hi}
                        </Td>

                        <Td fontSize={11} fontWeight={"medium"} isTruncated>
                          <Badge colorScheme={"red"}>D</Badge>{" "}
                          {q?.options[3]?.option_en}
                          <br />
                          {q?.options[3]?.option_hi}
                        </Td>
                        <Td>
                          <Badge fontSize={18} p="2" colorScheme={"green"}>
                            {q.correctOption}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              p={4}
              textAlign="center"
              h="100vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <QuestionImport
                setQuestion={setQuestion}
                setQuestionError={setQuestionError}
              >
                <Center
                  flexDir={"column"}
                  gap="4"
                  bg={"white"}
                  p={5}
                  border={"2px dashed grey"}
                  borderRadius={"lg"}
                >
                  <FaFileExcel size={70} />
                  <Text color="gray.500">Click Here to Upload Question</Text>
                </Center>
              </QuestionImport>
            </Box>
          )}
        </Box>

        {/* Form to create exam */}
        <Box p={4} backgroundColor="white" height="100vh" w={"25vw"}>
          <Heading size="md" mb={2}>
            Exam Details
          </Heading>
          <VStack alignItems={"flex-start"}>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              type="number"
              placeholder="Duration"
              onChange={(e) => setDuration(parseInt(e.target.value))}
              value={duration}
            />
            <Input
              placeholder="Venue"
              onChange={(e) => setVenue(e.target.value)}
              value={venue}
            />
            <FormControl id="die" isRequired>
              <FormLabel fontSize={"sm"}>Date of Exam</FormLabel>
              <Input
                size={"sm"}
                type="date"
                value={doe}
                onChange={(e: any) => setDoe(e.target.value)}
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
              colorScheme="red"
              size={"sm"}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Create Exam
            </Button>
            <Text mt={2} fontSize={"14"} color={"green"}>
              Status: {newExam?.status}
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default ManageExam;
