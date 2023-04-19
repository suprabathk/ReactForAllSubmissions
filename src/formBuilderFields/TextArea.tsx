import React, { useEffect, useState } from "react";
import { DeleteIcon } from "../AppIcons";

export function TextArea(props: {
  id: number;
  label: string;
  placeholder: string;
  value: string;
  updateLabelCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [label, setLabel] = useState(props.label);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateLabelCB(props.id, label);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <div className="w-full flex">
      <input
        type="text"
        id={`field-${props.id}`}
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        className="rounded-l-md border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500"
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
  );
}
