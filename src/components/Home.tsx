import React, { useEffect, useState } from "react";
import {
  DeleteIcon,
  LeftIcon,
  PlusIcon,
  PreviewIcon,
  RightIcon,
  SearchIcon,
} from "../AppIcons";
import { Link, useQueryParams } from "raviger";
import { formData } from "../types/formTypes";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForms } from "../utils/apiUtils";

const fetchForms = (
  setFormDataCB: (value: formData[]) => void,
  setCountCB: (count: number) => void,
  offset: number,
  limit: number
) => {
  listForms({ offset: offset, limit: limit })
    .then((data) => {
      setCountCB(data.count);
      setFormDataCB(data.results);
    })
    .catch((error) => console.log(error));
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [formData, setFormData] = useState<formData[]>([]);
  const [newForm, setNewForm] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 2;

  const deleteLocalForm = (id: number) => {
    setFormData((formData) => formData.filter((form) => form.id !== id));
    deleteForm(id).then(() => fetchForms(setFormData, setCount, offset, limit));
  };

  useEffect(() => fetchForms(setFormData, setCount, offset, limit), [offset]);

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
        <button
          className="flex items-center gap-1 text-center bg-gray-100 px-2 rounded-lg my-2 border font-semibold transition-all border-gray-400 text-gray-700"
          onClick={() => setNewForm(true)}
        >
          <PlusIcon className={"w-5 h-5"} />
          Create Form
        </button>
      </div>

      {formData.length > 0 && (
        <div className="flex-col flex justify-center items-center">
          {formData
            .filter((form) =>
              form.title.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((form) => (
              <div className="flex w-full my-2 bg-" key={form.id}>
                <Link
                  href={`/form/${form.id}`}
                  className="flex flex-col text-start rounded-none border border-r-0 flex-1 min-w-0 w-full text-sm px-2.5 py-1 bg-gray-100 rounded-l-md border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-gray-500 focus:border-gray-500"
                >
                  <h2 className="font-medium text-lg">{form.title}</h2>
                  <h2 className="">{form.description}</h2>
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

          <div className="w-full pt-4">
            <div className="flex">
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset - limit >= 0 ? offset - limit : offset;
                  });
                }}
                className="flex gap-2 items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-900 border-gray-600"
              >
                <LeftIcon className="h-5 w-5" />
                <span className="font-semibold">Prev</span>
              </button>
              <div className="rounded-none border min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500">
                <p className="text-gray-700 text-center">
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">
                    {offset + limit < count ? offset + limit : count}
                  </span>{" "}
                  of <span className="font-medium">{count}</span> results
                </p>
              </div>
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset + limit < count ? offset + limit : offset;
                  });
                }}
                className="flex gap-2 items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-900 border-gray-600"
              >
                <p className="font-semibold">Next</p>
                <RightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {formData.length === 0 && (
        <p className="text-gray-700 mt-2">There are no forms created!</p>
      )}
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
