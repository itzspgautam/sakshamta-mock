// pages/admin/AdminDashboard.tsx

import { RootState } from "@/state/store";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaTasks, FaUsers, FaClipboardList, FaChartPie } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminDashboard: React.FC = () => {
  const blockBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();


  const { admin, error, loading } = useSelector(
    (state: RootState) => state.AdminAuth
  );


  useEffect(() => {
    if (!admin) router.push("/admin");
  }, [admin]);


  return (
    <Box p={8}>
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        bg="blue.500"
        px={6}
        py={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Flex align="center">
          <img src="/logo.svg" alt="Logo" width="40" height="40" />
          <Heading ml={2} fontSize="xl" color="white">
            Admin Dashboard
          </Heading>
        </Flex>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="white">
            {admin?.name}
          </Text>
          <Text fontSize="sm" color="white">
            {admin?.email}
          </Text>
        </Box>
        {/* Add logout button or other user actions here */}
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        <DashboardBlock
          icon={<FaTasks />}
          title="Manage Exams"
          bgColor="blue.400"
          href="/admin/exam"
        >
          Create and upload questions
        </DashboardBlock>
        <DashboardBlock
          icon={<FaUsers />}
          title="Manage Candidates"
          bgColor="green.400"
          href="/admin/candidate"
        >
          Register and delete candidates
        </DashboardBlock>
        <DashboardBlock
          icon={<FaClipboardList />}
          title="Participation"
          bgColor="purple.400"
          href="/admin/participation"
        >
          View participation and results
        </DashboardBlock>
        <DashboardBlock
          icon={<FaChartPie />}
          title="Analytics"
          bgColor="teal.400"
          href="/admin/analytics"
        >
          View analytics and insights
        </DashboardBlock>
      </SimpleGrid>
    </Box>
  );
};

interface DashboardBlockProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  href: string;
  children: any;
}

const DashboardBlock: React.FC<DashboardBlockProps> = ({
  icon,
  title,
  bgColor,
  href,
  children,
}: DashboardBlockProps) => {
  const blockHoverBgColor = useColorModeValue(
    `${bgColor}.500`,
    `${bgColor}.700`
  );

  return (
    <NextLink href={href}>
      <Flex
        p={6}
        direction="column"
        align="center"
        justify="center"
        borderRadius="lg"
        boxShadow="md"
        bg={bgColor}
        color="white"
        transition="background-color 0.3s ease"
        cursor="pointer"
        _hover={{ bg: blockHoverBgColor }}
        h="100%"
      >
        <Box fontSize="3xl" mb={4}>
          {icon}
        </Box>
        <Heading fontSize="xl" mb={4}>
          {title}
        </Heading>
        <Text
          textAlign="center"
          fontSize="md"
          maxHeight="3em"
          overflow="hidden"
          lineHeight="1.5"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {children}
        </Text>
      </Flex>
    </NextLink>
  );
};

export default AdminDashboard;
