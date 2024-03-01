import AppConfig from "@/config/appCongif";
import { RootState } from "@/state/store";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
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
  const [exams, setExams] = useState<Exam[]>([]);

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



  const handleView = (id: number) => {
    // Logic to handle viewing exam details
  };

  const handleDelete = async(exam: any) => {
    try {
      const response = await axios.post(
        `${AppConfig.API}/api/admin/exam/delete`,
        {exam},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response?.data?.message);
     fetchExams()
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      alert(message);
    }
  };

  useEffect(() => {
    fetchExams();
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
          Exam List
        </Heading>
        <Link href="/admin/exam/create">
          <Button colorScheme="red">+ Add New Exam</Button>
        </Link>
      </Flex>
    </Box>

      <Table variant="striped" size={"sm"} >
        <Thead>
          <Tr>
            <Th>Sl. No.</Th>
            <Th minW={"200px"}>Title</Th>
            <Th>Venue</Th>
            <Th>Duration (min)</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exams.reverse().map((exam:any, index) => (
            <Tr key={exam.id}>
              <Td>{index + 1}</Td>
              <Td>{exam.title}</Td>
              <Td>{exam.venue}</Td>
              <Td>{exam.duration}</Td>
              <Td isNumeric>
              <Link href={`/admin/exam/${exam?._id}`}>
              <Button
                  size={"sm"}
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleView(exam?._id)}
                >
                  View
                </Button></Link>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  onClick={() => handleDelete(exam?._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExamList;
