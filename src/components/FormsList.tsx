import React, { useState } from "react";
import { formData } from "../types";
import { DeleteIcon } from "../AppIcons";

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export function FormsList(props: {
  openFormCB: (id: number) => void;
  openHomeCB: () => void;
}) {
  const [formData, setFormData] = useState(getLocalForms());

  const deleteLocalForm = (id: number) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.filter((form) => form.id !== id);
    setFormData(updatedLocalForms);
    saveLocalForms(updatedLocalForms);
  };

  return (
    <div className="flex flex-col justify-center text-white">
      <h1 className="font-semibold text-xl">Forms:</h1>
      {formData.length > 0 && (
        <div className="flex-col flex justify-center items-center my-2">
          {formData.map((form) => (
            <div className="flex w-full my-2" key={form.id}>
              <button
                onClick={() => props.openFormCB(form.id)}
                className="text-start rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 rounded-l-md border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <h2 className="font-medium">{form.title}</h2>
              </button>
              <button
                onClick={() => deleteLocalForm(form.id)}
                className="group inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-600 text-gray-400 border-gray-600"
              >
                <DeleteIcon className={"w-5 h-5"} />
                <span className="hidden group-hover:block ml-2 font-semibold">
                  Remove
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
      {formData.length === 0 && (
        <p className="text-white mt-2">There are no forms created!</p>
      )}
      <div className="flex gap-4 mt-2">
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-2 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={() => props.openFormCB(Number(new Date()))}
        >
          Create Form
        </button>
        <button
          className="bg-gray-700 py-2 w-full rounded-lg mt-2 hover:text-white hover:border-white border font-semibold transition-all border-gray-400 text-gray-400"
          onClick={props.openHomeCB}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
