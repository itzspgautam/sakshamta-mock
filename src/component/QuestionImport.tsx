import { QuestionInterface, QuestionOption } from "@/interface/ExamInterface"; // Assuming this is the correct import path
import { Box, Center } from "@chakra-ui/react";
import React, { useState, ChangeEvent, useRef, ReactNode } from "react";
import * as xlsx from "xlsx";

interface Props {
  setQuestion: React.Dispatch<React.SetStateAction<QuestionInterface[]>>; // Replace Question[] with QuestionInterface[]
  setQuestionError: React.Dispatch<React.SetStateAction<string[]>>;
  children:ReactNode
}

export const QuestionImport: React.FC<Props> = ({
  setQuestion,
  setQuestionError,
  children
}) => {

  const fileInputRef = useRef<any>();
  
  const readUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;


    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      if (!event.target) return;

      const data = event.target.result;
      const workbook = xlsx.read(data as ArrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet) as {
        Qenglish: string;
        Qhindi: string;
        Senglish: string;
        Shindi: string;
        Aenglish: string;
        Ahindi: string;
        Benglish: string;
        Bhindi: string;
        Cenglish: string;
        Chindi: string;
        Denglish: string;
        Dhindi: string;
        correct: string;
      }[];

      let ques:any = []; // Change to use QuestionInterface
      let error: string[] = [];

      json.forEach((q, i) => {
        let qNo = i + 1;
        if (!q.Qenglish || !q.Qhindi) {
          error.push("Question is empty in question no:" + qNo);
        }

        if (!q.Aenglish || !q.Ahindi) {
          error.push("Option A is empty in question no:" + qNo);
        }

        if (!q.Benglish || !q.Bhindi) {
          error.push("Option B is empty in question no:" + qNo);
        }
        if (!q.Cenglish || !q.Chindi) {
          error.push("Option C is empty in question no:" + qNo);
        }
        if (!q.Denglish || !q.Dhindi) {
          error.push("Option D is empty in question no:" + qNo);
        }

        if (!q.correct) {
          error.push("Correct Option is empty in question no:" + i);
        }

        ques.push({
          question: {
            en: q.Qenglish,
            hi: q.Qhindi,
          },
          correctOption: q.correct,
          options: [
            {
              option: "A",
              option_en: q?.Aenglish,
              option_hi: q?.Ahindi,
            },
            {
              option: "B",
              option_en: q.Benglish,
              option_hi: q.Bhindi,
            },
            {
              option: "C",
              option_en: q.Cenglish,
              option_hi: q.Chindi,
            },
            {
              option: "D",
              option_en: q.Denglish,
              option_hi: q.Dhindi,
            },
          ] ,
        });
      });
      console.log("questionsssss=>", ques);
      setQuestion(ques);
      setQuestionError(error);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div>
         <span   onClick={() => fileInputRef?.current.click()}>{children}</span>
    <form>
      <input style={{display:'none'}}
        type="file"
        name="upload"
        id="upload"
        ref={fileInputRef}
        onChange={(e) => readUploadFile(e)}
      />
    </form>
      </div>
  );
};
