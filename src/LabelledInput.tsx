import React from "react";
import { DeleteIcon } from "./AppIcons";

export function LabelledInput(props: {
  id: number;
  label: string;
  icon: JSX.Element;
  type: string;
  placeholder: string;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={`field-${props.id}`}
        className="block mb-2 text-sm font-medium text-gray-100"
      >
        {props.label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
          {props.icon}
        </span>
        <input
          type={props.type}
          id={`field-${props.id}`}
          className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={props.placeholder}
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-600 text-gray-400 border-gray-600"
        >
          <DeleteIcon className={"w-5 h-5"} />
        </button>
      </div>
    </div>
  );
}
