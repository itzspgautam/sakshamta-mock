import AppConfig from "@/config/appCongif";
import { QuestionInterface } from "@/interface/ExamInterface";
import { RootState } from "@/state/store";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Heading,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Exam {
  id: number;
  title: string;
  venue: string;
  duration: number;
}

const QuestionList = () => {
  const router = useRouter();
  const { id } = router.query;

  const { admin, error, loading, token } = useSelector(
    (state: RootState) => state.AdminAuth
  );
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [exam, setExam] = useState<any>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        `${AppConfig.API}/api/admin/exam/get`,
        { exam: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(response.data?.questions);
      setExam(response?.data?.exam);
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      alert(message);
    }
  };

  useEffect(() => {
    fetchQuestions();
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
            Questions of {exam?.title}
          </Heading>
          <Link href="/admin/exam/create">
            <Button colorScheme="red">+ Add New Exam</Button>
          </Link>
        </Flex>
      </Box>

      <Table variant="striped" colorScheme="orange" size={"sm"}>
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th rowSpan={2}>Sl</Th>
            <Th rowSpan={2}>Question</Th>
            <Th colSpan={4} textAlign="center" border={"none"}>
              Options
            </Th>
            <Th rowSpan={2} isNumeric>
              Answer
            </Th>
          </Tr>
          <Tr>
            <Th>A</Th>
            <Th>B</Th>
            <Th>C</Th>
            <Th>D</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions &&
            questions.map((q: any, i: number) => (
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
    </Box>
  );
};

export default QuestionList;
