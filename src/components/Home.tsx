import React, { useEffect, useState } from "react";
import { DeleteIcon, PreviewIcon, SearchIcon } from "../AppIcons";
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
      <Link
        className="text-center bg-gray-100 py-2 w-full rounded-lg my-2 border font-semibold transition-all border-gray-400 text-gray-700"
        href={"/forms/0"}
      >
        Create Form
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <div className="w-full">
          <label
            htmlFor={"search"}
            className="block mb-2 text-xl font-medium text-gray-700"
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
              className="group inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
            >
              <SearchIcon className={"w-5 h-5"} />
              <span className="hidden group-hover:block ml-2 font-semibold">
                Search
              </span>
            </button>
          </div>
        </div>
      </form>
      <h1 className="font-semibold text-xl mt-2">Forms</h1>
      {formData.length > 0 && (
        <div className="flex-col flex justify-center items-center">
          {formData
            .filter((form) =>
              form.title.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((form) => (
              <div className="flex w-full my-2" key={form.id}>
                <Link
                  href={`/forms/${form.id}`}
                  className="text-start rounded-none border border-r-0 block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 rounded-l-md border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-gray-500 focus:border-gray-500"
                >
                  <h2 className="font-medium">{form.title}</h2>
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
        <p className="text-white mt-2">There are no forms created!</p>
      )}
    </div>
  );
}
