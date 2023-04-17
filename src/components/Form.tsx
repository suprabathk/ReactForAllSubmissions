import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../AppIcons";
import { LabelledInput } from "../LabelledInput";
import { formField } from "../types/types";
import { Link, navigate } from "raviger";
import {
  getInitialFormData,
  saveFormData,
} from "../utils/localStorageFunctions";

const initialFormFields: formField[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    value: "",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "text",
    value: "",
  },
  {
    id: 4,
    label: "Date of birth",
    type: "date",
    value: "",
  },
  {
    id: 5,
    label: "Phone number",
    type: "tel",
    value: "",
  },
];

export default function Form(props: { id: number }) {
  const [fieldState, setFieldState] = useState(() =>
    getInitialFormData(props.id, initialFormFields)
  );
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fieldState.id !== props.id && navigate(`/forms/${fieldState.id}`);
  }, [fieldState.id, props.id]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(fieldState);
      console.log("Saved to local storage");
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [fieldState]);

  const addField = () => {
    setFieldState({
      ...fieldState,
      formFields: [
        ...fieldState.formFields,
        {
          id: Number(new Date()),
          label: newLabel,
          type: newType,
          value: "",
        },
      ],
    });
    setNewLabel("");
    setNewType("");
  };

  const removeField = (id: number) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.filter((field) => field.id !== id),
    });
  };

  const updateLabel = (id: number, label: string) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            label: label,
          };
        }
        return field;
      }),
    });
  };

  const updateType = (id: number, type: string) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            type: type,
          };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-4 divide-y">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600">
            Form title
          </span>
          <input
            type="text"
            id="form-title"
            ref={titleRef}
            value={fieldState.title}
            onChange={(event) =>
              setFieldState({ ...fieldState, title: event.target.value })
            }
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Form title"
          />
        </div>

        <h3 className="block mt-2 text-sm font-medium text-gray-700">
          Fields:
        </h3>

        {fieldState.formFields.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            placeholder="Enter label for field"
            updateLabelCB={updateLabel}
            updateTypeCB={updateType}
            removeFieldCB={removeField}
          />
        ))}
      </div>
      <div className="w-full pt-2">
        <label
          htmlFor="add-field"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Add field
        </label>
        <div className="flex">
          <select
            value={newType}
            onChange={(event) => setNewType(event.target.value)}
            className="items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <option className="w-full bg-gray-300" value="text">
              Text
            </option>
            <option className="w-full bg-gray-300" value="date">
              Date
            </option>
            <option className="w-full bg-gray-300" value="tel">
              Telephone
            </option>
            <option className="w-full bg-gray-300" value="email">
              Email
            </option>
          </select>
          <input
            type="text"
            id="add-field"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Field name"
          />
          <button
            onClick={addField}
            className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <PlusIcon className={"w-5 h-5"} />
            <span className="ml-2 font-semibold">Add field</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-gray-300 py-2 w-full rounded-lg mt-3 border font-semibold transition-all border-gray-700 text-gray-700"
          onClick={() => saveFormData(fieldState)}
        >
          Save
        </button>
        <Link
          href="/"
          className="text-center bg-gray-300 py-2 w-full rounded-lg mt-3 border font-semibold transition-all border-gray-700 text-gray-7s00"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
