import React, { useEffect, useState } from "react";
import { DeleteIcon } from "./AppIcons";

export function LabelledInput(props: {
  id: number;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  updateLabelCB: (id: number, value: string) => void;
  updateTypeCB: (id: number, type: string) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [label, setLabel] = useState(props.label);
  const [type, setType] = useState(props.type);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateLabelCB(props.id, label);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateTypeCB(props.id, type);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="w-full">
      <div className="flex">
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-900 border-gray-600"
        >
          <option className="w-full bg-gray-200" value="text">
            Text
          </option>
          <option className="w-full bg-gray-200" value="date">
            Date
          </option>
          <option className="w-full bg-gray-200" value="tel">
            Telephone
          </option>
          <option className="w-full bg-gray-200" value="email">
            Email
          </option>
        </select>
        <input
          type="text"
          id={`field-${props.id}`}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-purple-400 text-gray-900 focus:ring-purple-500 focus:border-purple-500"
          placeholder={props.placeholder}
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="group inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-900 border-gray-600"
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
