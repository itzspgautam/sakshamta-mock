import AppConfig from "@/config/appCongif";
import { CandidateInterface } from "@/interface/CandidateInterface";
import { ExamInterface } from "@/interface/ExamInterface";
import { RootState } from "@/state/store";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Heading, Avatar, Center, Badge } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Exam {
  id: number;
  title: string;
  venue: string;
  duration: number;
}

const ExamList: React.FC = () => {
  const { admin, error, loading, token } = useSelector(
    (state: RootState) => state.AdminAuth
  );
  const [candidates, setcandidates] = useState<CandidateInterface[]>([]);
  const [exams, setExams] = useState<ExamInterface[]>([]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.post(
        `${AppConfig.API}/api/admin/candidate/get-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcandidates(response.data?.candidates);
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
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
    fetchCandidates();
  }, []);



  return (
    <Box>
       <Box bg="black" p={1}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/admin/dashboard">
          <Button colorScheme="cyan" variant="outline">
            Back
          </Button>
        </Link>
        <Heading color="white" size="md">
          Candidate List
        </Heading>
        <Link href="/admin/candidate/register">
          <Button colorScheme="red">+ Register candidate</Button>
        </Link>
      </Flex>
    </Box>

    <Table variant="simple" size={'sm'}>
            <Thead>
              <Tr>
                <Th>Candidate</Th> <Th>Registration</Th> <Th>DOB</Th>
                <Th>Exam</Th>
                <Th isNumeric>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates &&
                candidates?.map((can) => (
                  <Tr key={can._id}>
                    <Td>
                      <Center justifyContent={"flex-start"} gap="2">
                        <Avatar src={can?.photo} />
                        {can.name}
                      </Center>
                    </Td>
                    <Td>
                      <Badge colorScheme={"blue"}>{can?.bsebUniqueid}</Badge>
                    </Td>
                    <Td>{moment(can?.dob).format("DD/MM/YYYY")}</Td>
                    <Td>
                    {exams?.find((exam) => exam._id === can.exam)?.title}
                    </Td>

                    <Td isNumeric>
                    {moment(exams?.find((exam) => exam._id === can.exam)?.examDate).format('DD/MM/YYYY')}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
    </Box>
  );
};

export default ExamList;
