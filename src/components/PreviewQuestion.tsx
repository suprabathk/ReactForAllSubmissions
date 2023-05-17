import { Link } from "raviger";
import React, { useEffect, useReducer, useState } from "react";
import { CompleteIcon, BackIcon, InfoIcon } from "../AppIcons";
import { MultiSelectField } from "../customComponents/MultiSelectField";
import {
  answerReducer,
  questionReducer,
} from "../reducers/previewFormReducers";
import { fieldAnswer, formData } from "../types/formTypes";
import { NextPrevAndSubmitButton } from "./PreviewForm";
import { submitAnswer } from "../utils/apiUtils";

export function PreviewQuestion({
  currentFormData,
}: {
  currentFormData: formData;
}) {
  const [answers, dispatchAnswer] = useReducer(answerReducer, []);
  const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, {
    index: 0,
    currentQuestion: currentFormData.formFields[0],
  });
  const [currentAnswer, setCurrentAnswer] = useState<string>(
    currentQuestion.index < currentFormData.formFields.length
      ? currentQuestion.currentQuestion.value
      : ""
  );
  const isFirstQuestion = currentQuestion.index === 0;
  const isLastQuestion =
    currentQuestion.index === currentFormData.formFields.length - 1;
  const isSubmitted =
    currentQuestion.index === currentFormData.formFields.length;

  const getIndexQuestion = (index: number) => currentFormData.formFields[index];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isSubmitted) {
      submitAnswer(currentFormData.id, { answers: answers }).then((data) =>
        console.log(data)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  useEffect(() => {
    let ans: fieldAnswer[] = [];
    if (currentFormData.formFields[currentQuestion.index]) {
      ans = answers.filter(
        (answer) =>
          answer.form_field ===
          currentFormData.formFields[currentQuestion.index].id
      );
    }
    ans.length > 0 && setCurrentAnswer(ans[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const nextQuestionCB = (questionID: number, ans: string) => {
    dispatchAnswer({
      type: "add_answer",
      questionID: questionID,
      ans: ans,
    });
    setCurrentAnswer("");
    dispatchQuestion({
      type: "update_question",
      getIndexQuestionCB: getIndexQuestion,
      kind: "next",
    });
  };

  const prevQuestionCB = () => {
    setCurrentAnswer("");
    dispatchQuestion({
      type: "update_question",
      getIndexQuestionCB: getIndexQuestion,
      kind: "prev",
    });
  };

  const setCurrentAnswerToString = (options: string[]) => {
    setCurrentAnswer(JSON.stringify(options));
  };

  return (
    <div className="w-full text-gray-700">
      {currentFormData.formFields.length !== 0 ? (
        <div>
          {currentQuestion.index < currentFormData.formFields.length ? (
            <div>
              <h2 className=" font-extrabold mt-3 mb-6 text-3xl">
                {currentFormData.title}
              </h2>
              <label
                className="font-semibold text-2xl"
                htmlFor={`q-${currentQuestion.currentQuestion.id}`}
              >
                {currentQuestion.currentQuestion.label}
              </label>
              <div className="flex flex-col gap-2 mt-2">
                {currentQuestion.currentQuestion.kind === "TEXT" &&
                  (currentQuestion.currentQuestion.meta.description
                    .fieldType === "textarea" ? (
                    <textarea
                      id={`q-${currentQuestion.currentQuestion.id}`}
                      value={currentAnswer ? currentAnswer : ""}
                      className="rounded-md border block w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  ) : (
                    <input
                      type={
                        currentQuestion.currentQuestion.meta.description
                          .fieldType
                      }
                      id={`q-${currentQuestion.currentQuestion.id}`}
                      value={currentAnswer ? currentAnswer : ""}
                      onChange={(event) => setCurrentAnswer(event.target.value)}
                      className="rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                      placeholder="Enter your answer"
                    />
                  ))}
                {currentQuestion.currentQuestion.kind === "DROPDOWN" && (
                  <select
                    id={`q-${currentQuestion.currentQuestion.id}`}
                    value={currentAnswer}
                    className="rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  >
                    <option value="">Select a value</option>
                    {currentQuestion.currentQuestion.options.map((option) => (
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
                {currentQuestion.currentQuestion.kind === "GENERIC" && (
                  <MultiSelectField
                    currentAnswer={JSON.parse(currentAnswer)}
                    currentQuestion={currentQuestion.currentQuestion}
                    setCurrentAnswerCB={setCurrentAnswerToString}
                  />
                )}
                {currentQuestion.currentQuestion.kind === "RADIO" && (
                  <div className="mb-2">
                    {currentQuestion.currentQuestion.options.map((option) => (
                      <div
                        key={option.id}
                        className="ml-4 flex items-center gap-2"
                      >
                        <label>{option.option}</label>
                        <input
                          type="radio"
                          name={`${currentQuestion.currentQuestion.id}`}
                          value={option.option}
                          checked={currentAnswer === option.option}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <NextPrevAndSubmitButton
                  isFirstQuestion={isFirstQuestion}
                  isLastQuestion={isLastQuestion}
                  onNext={() =>
                    nextQuestionCB(
                      currentQuestion.currentQuestion.id,
                      currentAnswer
                    )
                  }
                  onPrev={() => prevQuestionCB()}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-2 items-center  font-semibold text-3xl my-4">
                <CompleteIcon className={"w-10 h-10"} />
                <span>Thank you for filling the form</span>
              </div>
              <Link
                href="/"
                className="underline ml-2 text-blue-400 text-xl flex gap-2 items-center"
              >
                <BackIcon className={"w-5 h-5"} />
                <span>Go back Home</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex gap-2 items-center  font-semibold text-3xl my-4">
            <InfoIcon className="w-10 h-10" />
            <span>There are no questions in the form</span>
          </div>
          <Link
            href="/"
            className="underline ml-2 text-blue-400 text-xl flex gap-2 items-center"
          >
            <BackIcon className={"w-5 h-5"} />
            <span>Go back Home</span>
          </Link>
        </div>
      )}
    </div>
  );
}
