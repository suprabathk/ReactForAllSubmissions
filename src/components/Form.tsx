import React, { useEffect, useState } from "react";
import { FieldIcon, PlusIcon } from "../AppIcons";
import { LabelledInput } from "../LabelledInput";

interface formField {
  id: number;
  label: string;
  type: string;
  placeholder: string;
  // icon: JSX.Element;
  //Temporarily Using String as icon because Local Storage cannot store JSX components
  icon: string;
  value: string;
}

const initialFormFields: formField[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "John",
    // icon: <PersonIcon className={"w-5 h-5"} />,
    icon: "FN",
    value: "",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    // icon: <PersonIcon className={"w-5 h-5"} />,
    icon: "LN",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "text",
    placeholder: "johndoe@company.com",
    // icon: <EmailIcon className={"w-5 h-5"} />,
    icon: "@",
    value: "",
  },
  {
    id: 4,
    label: "Date of birth",
    type: "date",
    placeholder: "01-01-2000",
    // icon: <CalendarIcon className={"w-5 h-5"} />,
    icon: "DOB",
    value: "",
  },
  {
    id: 5,
    label: "Phone number",
    type: "tel",
    placeholder: "1234567890",
    // icon: <PhoneIcon className={"w-5 h-5"} />,
    icon: "PH",
    value: "",
  },
];

const saveFormData = (currentState: formField[]) => {
  localStorage.setItem("formFields", JSON.stringify(currentState));
};

const getInitialFormData: () => formField[] = () => {
  const formFieldsJSON = localStorage.getItem("formFields");
  const persistantFormFields = formFieldsJSON
    ? JSON.parse(formFieldsJSON)
    : initialFormFields;
  return persistantFormFields;
};

export function Form(props: { closeFormCB: () => void }) {
  const [fieldState, setFieldState] = useState(getInitialFormData());
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(fieldState);
      console.log("Saved to local storage");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [fieldState]);

  const addField = () => {
    setFieldState([
      ...fieldState,
      {
        id: Number(new Date()),
        label: newLabel,
        type: "text",
        placeholder: newLabel,
        icon: newLabel !== "" ? newLabel[0].toUpperCase() : "A",
        value: "",
      },
    ]);
  };

  const removeField = (id: number) => {
    setFieldState(fieldState.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    setFieldState(
      fieldState.map((field) => {
        return {
          ...field,
          value: "",
        };
      })
    );
  };

  const updateValue = (id: number, value: string) => {
    setFieldState(
      fieldState.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            value: value,
          };
        }
        return field;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 divide-y">
      <div className="flex flex-col gap-2">
        {fieldState.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            icon={field.icon}
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
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
