import React, { useState } from "react";
import { CalendarIcon, EmailIcon, PersonIcon, PhoneIcon } from "../AppIcons";
import { LabelledInput } from "../LabelledInput";

const formFields = [
  {
    id: 1,
    label: "First Name",
    type: "text",
    placeholder: "John",
    icon: <PersonIcon className={"w-5 h-5"} />,
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    icon: <PersonIcon className={"w-5 h-5"} />,
  },
  {
    id: 3,
    label: "Email",
    type: "text",
    placeholder: "johndoe@company.com",
    icon: <EmailIcon className={"w-5 h-5"} />,
  },
  {
    id: 4,
    label: "Date of birth",
    type: "date",
    placeholder: "01-01-2000",
    icon: <CalendarIcon className={"w-5 h-5"} />,
  },
  {
    id: 5,
    label: "Phone number",
    type: "tel",
    placeholder: "1234567890",
    icon: <PhoneIcon className={"w-5 h-5"} />,
  },
];

export function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: "New Field",
        type: "text",
        placeholder: "New Field",
        icon: <PersonIcon className={"w-5 h-5"} />,
      },
    ]);
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 ">
      {state.map((field) => (
        <LabelledInput
          key={field.id}
          id={field.id}
          label={field.label}
          icon={field.icon}
          type={field.type}
          placeholder={field.placeholder}
          removeFieldCB={removeField}
        />
      ))}
      <div className="flex gap-4">
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          type="submit"
        >
          Submit
        </button>
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
    </div>
  );
}
