import { useEffect, useState } from "react";
import { formData } from "../types/formTypes";
import { NextIcon, PrevIcon, TickIcon } from "../AppIcons";
import { Link } from "raviger";
import { fetchFormData, fetchFormFields } from "../utils/apiUtils";
import { PreviewQuestion } from "./PreviewQuestion";

export function NextPrevAndSubmitButton({
  isFirstQuestion,
  isLastQuestion,
  onNext,
  onPrev,
}: {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="flex gap-2">
      {isFirstQuestion && (
        <Link
          href="/"
          className="px-3 py-1 w-full text-sm text-center  border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <PrevIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Cancel</span>
          </div>
        </Link>
      )}
      {!isFirstQuestion && (
        <button
          onClick={onPrev}
          className="px-3 py-1 w-full text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <PrevIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Previous</span>
          </div>
        </button>
      )}
      {!isLastQuestion && (
        <button
          onClick={onNext}
          className="px-3 py-1 w-full text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <NextIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Next</span>
          </div>
        </button>
      )}
      {isLastQuestion && (
        <button
          onClick={onNext}
          className="px-3 py-1 w-full text-sm border rounded-md bg-gray-300 text-gray-700 border-gray-600"
        >
          <div className="inline-flex items-center">
            <TickIcon className={"w-5 h-5"} />
            <span className=" ml-2 font-semibold">Submit</span>
          </div>
        </button>
      )}
    </div>
  );
}

const getFormData = (
  formID: number,
  setCurrentFormDataCB: (formData: formData) => void
) => {
  fetchFormFields(formID).then((fields) => {
    fetchFormData(formID).then((data) => {
      setCurrentFormDataCB({
        ...data,
        formFields: fields.results,
      });
    });
  });
};

export function PreviewForm({ id }: { id: number }) {
  const [currentFormData, setCurrentFormData] = useState<formData>();
  useEffect(() => getFormData(id, setCurrentFormData), [id]);
  return (
    <div>
      {currentFormData ? (
        <PreviewQuestion currentFormData={currentFormData} />
      ) : (
        <div className="flex flex-col border rounded-md animate-pulse gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-300 p-2 rounded-md"></div>
            <div className="bg-gray-300 p-2 rounded-md"></div>
            <div className="bg-gray-300 p-2 rounded-md"></div>
          </div>
          <div className="flex w-full items-stretch justify-stretch gap-2 ">
            <div className="bg-gray-300 rounded-md p-5 w-full"></div>
            <div className="bg-gray-300 rounded-md p-5 w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
