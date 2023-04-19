import React, { useEffect, useState } from "react";
import { getFormData } from "../utils/localStorageFunctions";
import { fieldAnswer } from "../types/types";
import { CompleteIcon, NextIcon, TickIcon } from "../AppIcons";
import { MultiSelectField } from "../customComponents/MultiSelectField";

export function NextAndSubmitButton({
  isLastQuestion,
  onClick,
}: {
  isLastQuestion: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
    >
      {!isLastQuestion && (
        <div className="inline-flex items-center">
          <NextIcon className={"w-5 h-5"} />
          <span className=" ml-2 font-semibold">Next</span>
        </div>
      )}
      {isLastQuestion && (
        <div className="inline-flex items-center">
          <TickIcon className={"w-5 h-5"} />
          <span className=" ml-2 font-semibold">Submit</span>
        </div>
      )}
    </button>
  );
}

export function PreviewForm(props: { id: number }) {
  const [currentFormData] = useState(getFormData(props.id));
  const [answers, setAnswers] = useState<fieldAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    currentFormData.formFields[0]
  );
  const [isLastQuestion, setIsLastQuestion] = useState(
    currentFormData.formFields[currentFormData.formFields.length - 1] ===
      currentQuestion
  );
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>(
    currentQuestionIndex < currentFormData.formFields.length
      ? currentQuestion.value
      : ""
  );
  useEffect(() => console.log(answers), [answers]);

  useEffect(() => {
    setCurrentQuestion(currentFormData.formFields[currentQuestionIndex]);
  }, [currentFormData.formFields, currentQuestionIndex]);

  useEffect(() => {
    setIsLastQuestion(
      currentFormData.formFields[currentFormData.formFields.length - 1] ===
        currentQuestion
    );
  }, [currentFormData.formFields, currentQuestion]);

  const submitandNextCB = (ans: string | string[]) => {
    if (ans)
      setAnswers([
        ...answers,
        {
          id: props.id,
          ans: ans,
        },
      ]);
    setCurrentAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="w-full text-gray-700">
      {currentQuestionIndex < currentFormData.formFields.length ? (
        <div>
          <h2 className=" font-extrabold mt-3 mb-6 text-3xl">
            {currentFormData.title}
          </h2>
          <label
            className="font-semibold text-2xl"
            htmlFor={`q-${currentQuestion.id}`}
          >
            {currentQuestion.label}
          </label>
          <div className="flex flex-col gap-2 mt-2">
            {currentQuestion.kind === "text" && (
              <input
                type={currentQuestion.fieldType}
                id={`q-${currentQuestion.id}`}
                value={currentAnswer}
                onChange={(event) => setCurrentAnswer(event.target.value)}
                className="rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter your answer"
              />
            )}
            {currentQuestion.kind === "dropdown" && (
              <select
                id={`q-${currentQuestion.id}`}
                value={currentAnswer}
                className="rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                onChange={(e) => setCurrentAnswer(e.target.value)}
              >
                <option value="">Select a value</option>
                {currentQuestion.options.map((option) => (
                  <option
                    key={option.id}
                    className="my-2"
                    value={option.option}
                  >
                    {option.option}
                  </option>
                ))}
              </select>
            )}
            {currentQuestion.kind === "multiselect" && (
              <MultiSelectField
                currentAnswer={currentAnswer}
                currentQuestion={currentQuestion}
                setCurrentAnswerCB={setCurrentAnswer}
              />
            )}
            {currentQuestion.kind === "radio" && (
              <div className="mb-2">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="ml-4 flex items-center gap-2">
                    <label>{option.option}</label>
                    <input
                      type="radio"
                      name={`${currentQuestion.id}`}
                      value={option.option}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
            {currentQuestion.kind === "textarea" && (
              <textarea
                id={`q-${currentQuestion.id}`}
                value={currentAnswer}
                className="rounded-md border block w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            )}
            <NextAndSubmitButton
              isLastQuestion={isLastQuestion}
              onClick={(event) => submitandNextCB(currentAnswer)}
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center  font-semibold text-3xl my-4">
          <CompleteIcon className={"w-10 h-10"} />
          <span>Thank you for filling the form</span>
        </div>
      )}
    </div>
  );
}
