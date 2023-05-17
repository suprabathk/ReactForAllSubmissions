import React, { useEffect, useState } from "react";
import { DeleteIcon, PlusIcon } from "../AppIcons";
import { fieldOption } from "../types/formTypes";

export function MultiSelectField(props: {
  id: number;
  label: string;
  placeholder: string;
  value: string;
  options: fieldOption[];
  updateLabelCB: (id: number, value: string) => void;
  updateOptionsCB: (id: number, options: fieldOption[]) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [label, setLabel] = useState(props.label);
  const [options, setOptions] = useState<fieldOption[]>(
    props.options ? props.options : []
  );

  const addOption = () => {
    const option: fieldOption = {
      id: Number(new Date()),
      option: "",
    };
    setOptions([...options, option]);
  };

  const updateOption = (id: number, newOption: string) => {
    setOptions(
      options.map((opt) => {
        if (opt.id === id) {
          return {
            ...opt,
            option: newOption,
          };
        }
        return opt;
      })
    );
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

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
      props.updateOptionsCB(props.id, options);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div className="flex flex-col items-end">
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
      <div className="flex flex-col w-[75%]">
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <label className="block mb-1 text-md font-medium text-gray-700">
              Options:
            </label>
            <button
              onClick={() => addOption()}
              className="inline-flex items-center px-2 h-fit text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
            >
              <PlusIcon className={"w-5 h-5"} />
              <span className="ml-1 font-semibold">Add option</span>
            </button>
          </div>

          {options.length > 0 ? (
            <div>
              {options.map((option) => (
                <div className="w-full flex my-1" key={option.id}>
                  <input
                    type="text"
                    value={option.option}
                    onChange={(event) =>
                      updateOption(option.id, event.target.value)
                    }
                    className="rounded-l-md border block flex-1 min-w-0 w-full text-sm p-1 bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter a option"
                  />
                  <button
                    onClick={() => removeOption(option.id)}
                    className="px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-900 border-gray-600"
                  >
                    <DeleteIcon className={"w-5 h-5"} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-black flex flex-col">
              <span>There are no options.</span>
              <span className="bg-red-200 border border-red-600 px-2 rounded-md text-red-600">
                This question won't be added to form unless you add options
              </span>
            </div>
          )}
        </div>
        <div className=" pt-2"></div>
      </div>
    </div>
  );
}
