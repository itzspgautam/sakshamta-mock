// pages/index.tsx
import {
  Heading,
  Button,
  GridItem,
  Grid,
  Box,
  Container,
  Center,
  Input,
  Text,
  Flex,
  HStack,
  VStack,
  Spinner,
  Radio,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import Link from "next/link";

import prevImg from "@/assets/image/prev_arrow.png";
import nextImg from "@/assets/image/next_arrow.png";
import submitImg from "@/assets/image/final_submit_arow.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchQuestions,
  setLang,
  submitAnswer,
  updateExamAnswer,
} from "@/state/features/ExamSlice";
import { AnswerInterface, QuestionInterface } from "@/interface/ExamInterface";
import { MyTimer } from "@/component/Timer";
import { MyModal } from "@/component/Modal";
import sqLogo from "@/assets/image/sq-logo.png";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, exam, questions, answers, language, participation } =
    useSelector((state: RootState) => state.Exam);
  const { candidate } = useSelector((state: RootState) => state.Auth);

  const [activeQuestion, setActiveQuestion] = useState<QuestionInterface>();
  const [activeQAnswer, setActiveQAnswer] = useState<any>({
    question: null,
    answer: null,
    status: null,
  });

  const [questionZoom, setQuestionZoom] = useState(14);
  const [timer, setTimer] = useState<Date>();

  const selectOptionHandle = async (selectedOption: any) => {
    let status =
      activeQAnswer?.status === "TAG" || activeQAnswer?.status === "TAGATT"
        ? "TAGATT"
        : "ATT";
    await setActiveQAnswer({
      question: activeQuestion?._id,
      status,
      answer: selectedOption,
    });
  };

  const tagHandle = async () => {
    let status = activeQAnswer?.answer === null ? "TAG" : "TAGATT";
    await setActiveQAnswer({
      question: activeQuestion?._id,
      status,
      answer: activeQAnswer?.answer,
    });
  };
  const detagHandle = async () => {
    let status = activeQAnswer?.answer === null ? "UNATT" : "ATT";
    await setActiveQAnswer({
      question: activeQuestion?._id,
      status,
      answer: activeQAnswer?.answer,
    });
  };

  const eraseAnswerHandle = async () => {
    await setActiveQAnswer({
      question: activeQuestion?._id,
      status: "UNATT",
      answer: null,
    });
  };

  const nextQuestionHandle = async () => {
    if (questions && activeQuestion) {
      const currentQIndex = questions?.findIndex(
        (q) => q?._id === activeQuestion?._id
      );
      if (questions.length !== currentQIndex + 1) {
        let nextQuestion = questions[currentQIndex + 1];
        setActiveQuestion(nextQuestion);
      }
    }
  };

  const prevquestionHandle = async () => {
    if (questions && activeQuestion) {
      const currentQIndex = questions?.findIndex(
        (q) => q?._id === activeQuestion?._id
      );
      if (0 !== currentQIndex) {
        let nextQuestion = questions[currentQIndex - 1];
        setActiveQuestion(nextQuestion);
      }
    }
  };

  const languageHandle = (e: any) => {
    dispatch(setLang(e.target.value));
  };

  const submitHandle = () => {
    dispatch(submitAnswer());
  };

  const getBgColor = (q: QuestionInterface) => {
    const answer = answers?.find(
      (a) => a?.question?.toString() === q?._id?.toString()
    );
    const status = answer?.status;
    let color: string;

    if (status === "ATT") {
      color = "#00FF00";
    } else if (status === "UNATT") {
      color = "white";
    } else if (status === "TAG") {
      color = "#FEBF01";
    } else if (status === "TAGATT") {
      color = "#8A64BF";
    } else {
      color = "white"; // Default color if status is undefined or doesn't match any condition
    }

    return color;
  };

  const getColor = (q: QuestionInterface) => {
    const answer = answers?.find(
      (a) => a?.question?.toString() === q?._id?.toString()
    );
    const status = answer?.status;
    let color: string;

    if (status === "TAGATT") {
      color = "white";
    } else {
      color = "black";
    }

    return color;
  };

  useEffect(() => {
    //update state answer on change of option
    dispatch(updateExamAnswer(activeQAnswer));
  }, [activeQAnswer]);

  useEffect(() => {
    //update saved answer on change of question
    const getSavedAnswer = answers?.find(
      (q) => q?.question?.toString() === activeQuestion?._id?.toString()
    );
    setActiveQAnswer(getSavedAnswer);
  }, [activeQuestion]);

  useEffect(() => {
    //open first question on load
    if (participation) {
      router.push("/candidate/submit");
      return;
    }
  }, [participation]);

  useEffect(() => {
    console.log("called");
    if (!candidate) {
      router.push("/candidate/login");
      return;
    }
    if (exam && questions) {
      setActiveQuestion(questions[0]);

      let time = new Date();
      time.setSeconds(time.getSeconds() + 60 * exam.duration);
      setTimer(time);
    }
  }, []);

  return (
    <Center height={"100vh"}>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Grid
          templateAreas={[
            `"header"
                 "info"
                  "main"
                  "footer"`,
          ]}
          gridTemplateRows={"75px 30px 1fr 50px"}
          gridTemplateColumns={"1fr"}
          h="100vh"
          w={"100vw"}
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem area={"header"}>
            <Center h="60px" bg="#606a74">
              <Image
                alt="logo"
                src={sqLogo}
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </Center>
            <Box
              h="15px"
              bg="#D8D8D8"
              borderTop={"1px solid white"}
              boxShadow={"0px 0px 20px grey"}
            ></Box>
          </GridItem>

          <GridItem area={"info"}>
            <Box bg="#BBD42D" height={"100%"}>
              <Container maxW={"5xl"} flex={1} h="100%">
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  h="100%"
                >
                  <Text fontSize={14} color={"black"}>
                    {exam?.title}
                  </Text>
                  <HStack>
                    <Text fontSize={14} color={"black"}>
                      Language:
                    </Text>
                    <select onChange={languageHandle}>
                      <option
                        value="Hindi"
                        selected={language === "Hindi" ? true : false}
                      >
                        Hindi
                      </option>
                      <option
                        value="English"
                        selected={language === "English" ? true : false}
                      >
                        English
                      </option>
                    </select>
                  </HStack>

                  <HStack h="100%">
                    <Text fontSize={14} color={"black"}>
                      Time Left:
                    </Text>
                    <Center h="100%" bg="#606A74" px={2}>
                      <Text fontSize={14} color={"white"}>
                        {timer && (
                          <MyTimer
                            expiryTimestamp={timer}
                            submitHandle={submitHandle}
                          />
                        )}
                      </Text>
                    </Center>
                  </HStack>
                </HStack>
              </Container>
            </Box>
          </GridItem>
          <GridItem
            area={"main"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Container maxW={"5xl"} flex={1} h="100%">
              <HStack h={"100%"} py={2}>
                <Box
                  flex={5}
                  h={"100%"}
                  borderRadius={"15px 15px 0 0"}
                  overflow={"hidden"}
                >
                  <Box bg={"#606a74"} p={2}>
                    <HStack>
                      <Text fontSize={14} color={"white"} fontWeight={"light"}>
                        Text Size
                      </Text>
                      <Center
                        onClick={() => setQuestionZoom(questionZoom - 1)}
                        cursor={"pointer"}
                        h={"25px"}
                        w={"25px"}
                        bg="white"
                        fontSize={14}
                        borderRadius={"50%"}
                      >
                        A-
                      </Center>
                      <Center
                        onClick={() => setQuestionZoom(questionZoom + 1)}
                        cursor={"pointer"}
                        h={"25px"}
                        w={"25px"}
                        bg="white"
                        fontSize={14}
                        borderRadius={"50%"}
                      >
                        A+
                      </Center>
                    </HStack>
                  </Box>
                  <VStack
                    p={2}
                    py={4}
                    gap={5}
                    justifyContent={"flex-start"}
                    alignItems={"left"}
                  >
                    <Text fontSize={questionZoom} color={"black"}>
                      Q
                      {((index) =>
                        index !== -1 ? (index + 1).toString() : "0")(
                        questions?.findIndex(
                          (q) => q._id === activeQuestion?._id
                        ) ?? -1
                      )}
                      {". "}
                      {language === "Hindi"
                        ? activeQuestion?.question.hi
                        : activeQuestion?.question.en}
                    </Text>

                    <VStack w={"100%"} alignItems={"flex-start"}>
                      {activeQuestion?.options?.map((o, index) => (
                        <Radio
                          onClick={() => selectOptionHandle(o?.option)}
                          key={o._id}
                          border={"1px solid grey"}
                          isChecked={
                            activeQAnswer?.answer === o?.option ? true : false
                          }
                        >
                          <Text
                            fontSize={questionZoom}
                            color={"black"}
                            fontWeight={"medium"}
                          >
                            {o?.option}.{" "}
                            {language === "Hindi" ? o?.option_hi : o?.option_en}
                          </Text>
                        </Radio>
                      ))}{" "}
                    </VStack>
                  </VStack>
                </Box>
                <VStack
                  flex={3}
                  h={"100%"}
                  borderRadius={"15px 15px 0 0"}
                  overflow={"hidden"}
                >
                  <HStack p={3} bg={"#BBD42D"} w="100%">
                    <VStack>
                      <Box bg="white" aspectRatio={4 / 5}>
                        <Image
                          src={candidate?.photo}
                          width={100}
                          height={100}
                          style={{ height: "100%", width: "100%" }}
                          alt="photo"
                        />
                      </Box>
                      <Box
                        bg="white"
                        aspectRatio={1 / 2}
                        width={"120px"}
                        h="40px"
                      >
                        <Image
                          src={candidate?.sign}
                          width={100}
                          height={100}
                          style={{ height: "100%", width: "100%" }}
                          alt="photo"
                        />
                      </Box>
                    </VStack>
                    <VStack width={"100%"} height={"full"}>
                      <VStack width={"100%"} alignItems={"flex-start"} gap={0}>
                        <Text fontSize={12} color={"grey"} fontWeight={"light"}>
                          Username
                        </Text>
                        <Text fontSize={14} color={"black"} fontWeight={"bold"}>
                          {candidate?.bsebUniqueid}
                        </Text>
                      </VStack>
                      <VStack width={"100%"} alignItems={"flex-start"} gap={0}>
                        <Text fontSize={12} color={"grey"} fontWeight={"light"}>
                          Candidate Name
                        </Text>
                        <Text fontSize={14} color={"black"} fontWeight={"bold"}>
                          {candidate?.name}
                        </Text>
                      </VStack>
                    </VStack>
                  </HStack>

                  <Box
                    bg={"#D9D9D9"}
                    flex={1}
                    w="100%"
                    p={2}
                    display={"flex"}
                    flexDir={"column"}
                  >
                    <Text fontSize={14} color={"black"} fontWeight={"light"}>
                      Number of questions
                    </Text>
                    <Box overflowY="auto" h="190" flexWrap="wrap">
                      {questions?.map((q, i) => (
                        <span
                          onClick={() => {
                            setActiveQuestion(q);
                          }}
                          key={q?._id}
                          style={{
                            width: "35px",
                            height: "20px",
                            fontSize: "11px",
                            backgroundColor: `${getBgColor(q)}`,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "2px",
                            cursor: "pointer",
                            color: `${getColor(q)}`,
                          }}
                        >
                          Q{i + 1}
                        </span>
                      ))}
                    </Box>
                  </Box>
                </VStack>
              </HStack>
            </Container>
          </GridItem>
          <GridItem bg="#D1D1D1" area={"footer"}>
            <Box height={"100%"}>
              <Container maxW={"5xl"} flex={1} h="100%">
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  h="100%"
                >
                  <HStack>
                    <Button
                      onClick={prevquestionHandle}
                      size={"sm"}
                      bgImage={"linear-gradient(#525252, #151515)"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                      p={0}
                      color={"white"}
                      fontWeight={"regular"}
                      pr={2}
                      _hover={{ bgImage: "linear-gradient(#151515, #151515)" }}
                    >
                      <Center w={8} bg="#8A919A" h={"100%"} mr={3}>
                        <Image src={prevImg} alt="Prev" />
                      </Center>
                      Previous Question
                    </Button>
                    <Button
                      onClick={nextQuestionHandle}
                      size={"sm"}
                      bgImage={"linear-gradient(#525252, #151515)"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                      p={0}
                      color={"white"}
                      fontWeight={"regular"}
                      pl={2}
                      _hover={{ bgImage: "linear-gradient(#151515, #151515)" }}
                    >
                      Next Question
                      <Center w={8} bg="#8A919A" h={"100%"} ml={3}>
                        <Image src={nextImg} alt="Prev" />
                      </Center>
                    </Button>
                  </HStack>

                  <HStack gap={5}>
                    <Button
                      onClick={
                        activeQAnswer?.status === "TAG" ||
                        activeQAnswer?.status === "TAGATT"
                          ? detagHandle
                          : tagHandle
                      }
                      colorScheme={"yellow"}
                      size={"sm"}
                      fontWeight={"regular"}
                      px="6"
                    >
                      {activeQAnswer?.status === "TAG" ||
                      activeQAnswer?.status === "TAGATT"
                        ? "DETAG"
                        : "TAG"}
                    </Button>
                    <Button
                      colorScheme={"red"}
                      size={"sm"}
                      fontWeight={"regular"}
                      px="6"
                      onClick={eraseAnswerHandle}
                    >
                      Erase
                    </Button>
                  </HStack>

                  <MyModal
                    message={
                      <span>
                        You have{" "}
                        <b>{timer && <MyTimer expiryTimestamp={timer} />}</b> to
                        answer{" "}
                        <b>
                          {answers?.filter((a) => a?.status === "UNATT").length}{" "}
                          Un-Answered Question
                        </b>
                        ,{" "}
                        <b>
                          {answers?.filter((a) => a?.status === "TAG").length}{" "}
                          Tagged Question(s)
                        </b>{" "}
                        and{" "}
                        <b>
                          {
                            answers?.filter((a) => a?.status === "TAGATT")
                              .length
                          }{" "}
                          Tagged and answered Question(s).
                        </b>
                        <Text>
                          Still do you want to proceed with your submit?{" "}
                        </Text>
                      </span>
                    }
                    yesHandle={submitHandle}
                  >
                    <Button
                      size={"sm"}
                      bgImage={"linear-gradient(#A5BF16, #BCD52F)"}
                      justifyContent={"space-between"}
                      overflow={"hidden"}
                      p={0}
                      color={"black"}
                      fontWeight={"regular"}
                      pr={2}
                      _hover={{
                        bgImage: "linear-gradient(#BCD52F, #BCD52F)",
                      }}
                    >
                      <Center w={8} bg="#73880A" h={"100%"} mr={3}>
                        <Image src={submitImg} alt="Submit" />
                      </Center>
                      Preview submit
                    </Button>
                  </MyModal>
                </HStack>
              </Container>
            </Box>
          </GridItem>
        </Grid>
      )}
    </Center>
  );
}
