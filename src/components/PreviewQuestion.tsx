import React, { useState } from "react";
import { NextIcon, TickIcon } from "../AppIcons";

export function PreviewQuestion(props: {
  id: number;
  label: string;
  type: string;
  value: string;
  submitAndNextCB: (ans: string) => void;
  isLastQuestion: boolean;
}) {
  const [answer, setAnswer] = useState(props.value);
  return (
    <div className="w-full text-white">
      <label htmlFor={`field-${props.id}`}>{props.label}</label>
      <div className="flex mt-2">
        <input
          type={props.type}
          id={`field-${props.id}`}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="rounded-l-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your answer"
        />
        <button
          onClick={() => {
            setAnswer("");
            props.submitAndNextCB(answer);
          }}
          className="px-3 text-sm border border-l-0 rounded-r-md bg-gray-600 text-gray-400 border-gray-600"
        >
          {!props.isLastQuestion && (
            <div className="inline-flex items-center">
              <NextIcon className={"w-5 h-5"} />
              <span className=" ml-2 font-semibold">Next</span>
            </div>
          )}
          {props.isLastQuestion && (
            <div className="inline-flex items-center">
              <TickIcon className={"w-5 h-5"} />
              <span className=" ml-2 font-semibold">Submit</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
