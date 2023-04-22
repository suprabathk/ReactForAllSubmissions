import React, { useEffect, useState } from "react";
import { DeleteIcon, PlusIcon, PreviewIcon, SearchIcon } from "../AppIcons";
import { Link, useQueryParams } from "raviger";
import { getLocalForms, saveLocalForms } from "../utils/localStorageFunctions";

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [formData, setFormData] = useState(getLocalForms());

  const deleteLocalForm = (id: number) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.filter((form) => form.id !== id);
    setFormData(updatedLocalForms);
  };

  useEffect(() => saveLocalForms(formData), [formData]);

  return (
    <div className="flex flex-col justify-center text-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <div className="w-full">
          <label
            htmlFor={"search"}
            className="block mb-2 text-2xl font-bold text-gray-700"
          >
            Search
          </label>
          <div className="flex">
            <input
              type="text"
              id={"search"}
              value={searchString}
              name="search"
              onChange={(event) => setSearchString(event.target.value)}
              className="border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 rounded-l-md border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search for form"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
            >
              <SearchIcon className={"w-5 h-5"} />
              <span className="ml-2 font-semibold">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="flex gap-2 items-center justify-between mt-4">
        <h1 className="font-bold text-2xl">Forms</h1>
        <Link
          className="flex items-center gap-1 text-center bg-gray-100 px-2 rounded-lg my-2 border font-semibold transition-all border-gray-400 text-gray-700"
          href={"/form/0"}
        >
          <PlusIcon className={"w-5 h-5"} />
          Create Form
        </Link>
      </div>
      {formData.length > 0 && (
        <div className="flex-col flex justify-center items-center">
          {formData
            .filter((form) =>
              form.title.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((form) => (
              <div className="flex w-full my-2" key={form.id}>
                <Link
                  href={`/form/${form.id}`}
                  className="flex flex-col text-start rounded-none border border-r-0 flex-1 min-w-0 w-full text-sm px-2.5 py-1 bg-gray-100 rounded-l-md border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-gray-500 focus:border-gray-500"
                >
                  <h2 className="font-medium text-lg">{form.title}</h2>
                  <h2 className="">{form.formFields.length} fields</h2>
                </Link>
                <Link
                  href={`/preview/${form.id}`}
                  className="group inline-flex items-center px-3 text-sm border bg-gray-300 text-gray-700 border-gray-600"
                >
                  <PreviewIcon className={"w-5 h-5"} />
                  <span className="hidden group-hover:block ml-2 font-semibold">
                    Preview
                  </span>
                </Link>
                <button
                  onClick={() => deleteLocalForm(form.id)}
                  className="group inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
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
        <p className="text-gray-700 mt-2">There are no forms created!</p>
      )}
    </div>
  );
}
