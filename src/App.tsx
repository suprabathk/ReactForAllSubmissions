import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 4, label: "Date of birth", type: "date" },
  { id: 5, label: "Phone number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        <form className="flex flex-col gap-2 ">
          {formFields.map((field) => (
            <div key={field.id} className="w-full">
              <label htmlFor={`field-${field.id}`}>{field.label}</label>
              <input
                className="border border-purple-400 rounded-lg p-2 mr-2 w-full outline-purple-600"
                id={`field-${field.id}`}
                type={field.type}
              />
            </div>
          ))}
          <button
            className="hover:bg-purple-400 py-2 rounded-lg mt-2 hover:text-white border font-bold transition-all border-purple-400 text-purple-400"
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
