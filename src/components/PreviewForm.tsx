import React, { useEffect, useState } from "react";
import { getFormData } from "../utils/localStorageFunctions";
import { PreviewQuestion } from "./PreviewQuestion";
import { fieldAnswer } from "../types/types";
import { CompleteIcon } from "../AppIcons";

export function PreviewForm(props: { id: number }) {
  const { title, formFields } = getFormData(props.id);
  const lastField = formFields[formFields.length - 1];
  const [answers, setAnswers] = useState<fieldAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const submitAndNextCB = (ans: string) => {
    setAnswers([
      ...answers,
      {
        id: props.id,
        ans: ans,
      },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => console.log(answers), [answers]);

  return (
    <div className="text-gray-700">
      <h2 className=" font-extrabold mt-3 mb-6 text-3xl">{title}</h2>
      {currentQuestionIndex < formFields.length ? (
        <PreviewQuestion
          id={formFields[currentQuestionIndex].id}
          label={formFields[currentQuestionIndex].label}
          type={formFields[currentQuestionIndex].type}
          value={formFields[currentQuestionIndex].value}
          submitAndNextCB={submitAndNextCB}
          isLastQuestion={formFields[currentQuestionIndex].id === lastField.id}
        />
      ) : (
        <div className="flex gap-2 items-center  font-semibold text-3xl my-4">
          <CompleteIcon className={"w-10 h-10"} />
          <span>Thank you for filling the form</span>
        </div>
      )}
    </div>
  );
}
