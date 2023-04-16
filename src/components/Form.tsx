import React, { useEffect, useRef, useState } from "react";
import { FieldIcon, PlusIcon } from "../AppIcons";
import { LabelledInput } from "../LabelledInput";
import { formField } from "../types";
import { Link, navigate } from "raviger";
import { getInitialFormData, saveFormData } from "../localStorageFunctions";

const initialFormFields: formField[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "John",
    value: "",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "text",
    placeholder: "johndoe@company.com",
    value: "",
  },
  {
    id: 4,
    label: "Date of birth",
    type: "date",
    placeholder: "01-01-2000",
    value: "",
  },
  {
    id: 5,
    label: "Phone number",
    type: "tel",
    placeholder: "1234567890",
    value: "",
  },
];

export default function Form(props: { id: number }) {
  const [fieldState, setFieldState] = useState(() =>
    getInitialFormData(props.id, initialFormFields)
  );
  const [newLabel, setNewLabel] = useState("");
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
          type: "text",
          placeholder: newLabel,
          value: "",
        },
      ],
    });
    setNewLabel("");
  };

  const removeField = (id: number) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.filter((field) => field.id !== id),
    });
  };

  const clearForm = () => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        return {
          ...field,
          value: "",
        };
      }),
    });
  };

  const updateValue = (id: number, value: string) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            value: value,
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
          <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
            Title
          </span>
          <input
            type="text"
            id="form-title"
            ref={titleRef}
            value={fieldState.title}
            onChange={(event) =>
              setFieldState({ ...fieldState, title: event.target.value })
            }
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Form title"
          />
        </div>

        {fieldState.formFields.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            updateValueCB={updateValue}
            placeholder={field.placeholder}
            removeFieldCB={removeField}
          />
        ))}
      </div>
      <div className="w-full pt-2">
        <label
          htmlFor="add-field"
          className="block mb-2 text-sm font-medium text-gray-100"
        >
          Add field
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
            <FieldIcon className="w-5 h-5" />
          </span>
          <input
            type="text"
            id="add-field"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Field name"
          />
          <button
            onClick={addField}
            className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-600 text-gray-400 border-gray-600"
          >
            <PlusIcon className={"w-5 h-5"} />
            <span className="ml-2 font-semibold">Add field</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={() => saveFormData(fieldState)}
        >
          Save
        </button>
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={clearForm}
        >
          Clear Form
        </button>
        <Link
          href="/"
          className="text-center bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
