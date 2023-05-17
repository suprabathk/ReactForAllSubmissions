import React, { useState } from "react";
import { navigate } from "raviger";
import { Errors, Form } from "../types/formTypes";
import { validateForm } from "../types/formTypes";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });
  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/form/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700 font-extrabold">
        Create form
      </h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="w-full mb-6">
          <div className="flex mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600">
              Title
            </span>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="w-full mb-6">
          <div className="flex flex-col mt-2">
            <span className="inline-flex items-center px-3 text-md font-semibold border border-b-0 rounded-t-md bg-gray-300 text-gray-700 border-gray-600">
              Description
            </span>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-b-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="flex items-start mb-6 gap-2">
          <div className="h-5">
            <input
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              type="checkbox"
              name="is_public"
              id="is_public"
              value={form.is_public ? "true" : "false"}
              onChange={(e) => {
                setForm({ ...form, is_public: e.target.checked });
              }}
            />
          </div>
          <label
            htmlFor="is_public"
            className={`"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" ${
              errors.is_public ? "text-red-500" : ""
            }`}
          >
            Is Public
          </label>
          {errors.is_public && (
            <p className="text-red-500">{errors.is_public}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-1 text-md font-semibold border rounded-md w-full text-center bg-gray-300 text-gray-700 border-gray-600"
        >
          Create form
        </button>
      </form>
    </div>
  );
}
