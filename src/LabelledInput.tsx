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
          className="items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600"
        >
          <option className="w-full bg-slate-600" value="text">
            Text
          </option>
          <option className="w-full bg-slate-600" value="date">
            Date
          </option>
          <option className="w-full bg-slate-600" value="tel">
            Telephone
          </option>
          <option className="w-full bg-slate-600" value="email">
            Email
          </option>
        </select>
        <input
          type="text"
          id={`field-${props.id}`}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
