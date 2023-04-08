import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { CalendarIcon, EmailIcon, PersonIcon, PhoneIcon } from "./AppIcons";

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

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-zinc-950 border border-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        <form className="flex flex-col gap-2 ">
          {formFields.map((field) => (
            <div key={field.id} className="w-full">
              <label
                htmlFor={`field-${field.id}`}
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                {field.label}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  id={`field-${field.id}`}
                  className="rounded-none rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}
          <button
            className="bg-gray-700 py-2 rounded-lg mt-3 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </AppContainer>
  );
}

export default App;
