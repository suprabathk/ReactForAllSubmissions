import React from "react";
import { DeleteIcon } from "./AppIcons";

export function LabelledInput(props: {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  updateValueCB: (id: number, value: string) => void;
  value: string;
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
        <input
          type={props.type}
          id={`field-${props.id}`}
          value={props.value}
          onChange={(event) =>
            props.updateValueCB(props.id, event.target.value)
          }
          className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 rounded-l-md border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={props.placeholder}
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="group inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-600 text-gray-400 border-gray-600"
        >
          <DeleteIcon className={"w-5 h-5"} />
          <span className="hidden group-hover:block ml-2 font-semibold">
            Remove
          </span>
        </button>
      </div>
    </div>
  );
}
