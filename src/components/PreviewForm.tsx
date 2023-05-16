import React, { useEffect, useReducer, useState } from "react";
import { getFormData } from "../utils/localStorageFunctions";
import { fieldAnswer } from "../types/formTypes";
import {
  BackIcon,
  CompleteIcon,
  InfoIcon,
  NextIcon,
  PrevIcon,
  TickIcon,
} from "../AppIcons";
import { MultiSelectField } from "../customComponents/MultiSelectField";
import { Link } from "raviger";
import {
  answerReducer,
  questionReducer,
} from "../reducers/previewFormReducers";

export function NextPrevAndSubmitButton({
  isFirstQuestion,
  isLastQuestion,
  onNext,
  onPrev,
}: {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="flex gap-2">
      {isFirstQuestion && (
        <Link
          href="/"
          className="px-3 py-1 w-full text-sm text-center  border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <PrevIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Cancel</span>
          </div>
        </Link>
      )}
      {!isFirstQuestion && (
        <button
          onClick={onPrev}
          className="px-3 py-1 w-full text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <PrevIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Previous</span>
          </div>
        </button>
      )}
      <button
        onClick={onNext}
        className="px-3 py-1 w-full text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
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
    </div>
  );
}

export function PreviewForm(props: { id: number }) {
  const currentFormData = getFormData(props.id);
  const [answers, dispatchAnswer] = useReducer(answerReducer, []);
  const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, {
    index: 0,
    currentQuestion: currentFormData.formFields[0],
  });
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>(
    currentQuestion.index < currentFormData.formFields.length
      ? currentQuestion.currentQuestion.value
      : ""
  );
  const isFirstQuestion = currentQuestion.index === 0;
  const isLastQuestion =
    currentQuestion.index === currentFormData.formFields.length - 1;

  const getIndexQuestion = (index: number) => currentFormData.formFields[index];

  useEffect(() => console.log(answers), [answers]);

  useEffect(() => {
    let ans: fieldAnswer[] = [];
    if (currentFormData.formFields[currentQuestion.index]) {
      ans = answers.filter(
        (answer) =>
          answer.id === currentFormData.formFields[currentQuestion.index].id
      );
    }
    ans.length > 0 && setCurrentAnswer(ans[0].ans);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const submitandNextCB = (questionID: number, ans: string | string[]) => {
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
                {currentQuestion.currentQuestion.kind === "text" && (
                  <input
                    type={currentQuestion.currentQuestion.fieldType}
                    id={`q-${currentQuestion.currentQuestion.id}`}
                    value={currentAnswer}
                    onChange={(event) => setCurrentAnswer(event.target.value)}
                    className="rounded-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter your answer"
                  />
                )}
                {currentQuestion.currentQuestion.kind === "dropdown" && (
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
                {currentQuestion.currentQuestion.kind === "multiselect" && (
                  <MultiSelectField
                    currentAnswer={currentAnswer}
                    currentQuestion={currentQuestion.currentQuestion}
                    setCurrentAnswerCB={setCurrentAnswer}
                  />
                )}
                {currentQuestion.currentQuestion.kind === "radio" && (
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
                {currentQuestion.currentQuestion.kind === "textarea" && (
                  <textarea
                    id={`q-${currentQuestion.currentQuestion.id}`}
                    value={currentAnswer}
                    className="rounded-md border block w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  />
                )}
                <NextPrevAndSubmitButton
                  isFirstQuestion={isFirstQuestion}
                  isLastQuestion={isLastQuestion}
                  onNext={() =>
                    submitandNextCB(
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
