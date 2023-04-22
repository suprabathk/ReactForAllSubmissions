import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../AppIcons";
import { TextField } from "../formBuilderFields/TextField";
import { formField, fieldOption, textFieldTypes } from "../types/types";
import { Link, navigate } from "raviger";
import {
  getInitialFormData,
  saveFormData,
} from "../utils/localStorageFunctions";
import { TextArea } from "../formBuilderFields/TextArea";
import { RadioButtonField } from "../formBuilderFields/RadioButtonField";
import { DropdownField } from "../formBuilderFields/DropdownField";
import { MultiSelectField } from "../formBuilderFields/MultiSelectField";

const initialFormFields: formField[] = [
  {
    kind: "text",
    id: 1,
    label: "First Name",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 2,
    label: "Last Name",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 3,
    label: "Email",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 4,
    label: "Date of birth",
    fieldType: "date",
    value: "",
  },
  {
    kind: "text",
    id: 5,
    label: "Phone number",
    fieldType: "tel",
    value: "",
  },
];

export default function Form(props: { id: number }) {
  const [fieldState, setFieldState] = useState(() =>
    getInitialFormData(props.id, initialFormFields)
  );
  const [newLabel, setNewLabel] = useState("");
  const [newTextType, setNewTextType] = useState<textFieldTypes>("text");
  const [newKind, setNewKind] = useState<formField["kind"]>("text");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fieldState.id !== props.id && navigate(`/form/${fieldState.id}`);
  }, [fieldState.id, props.id]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(fieldState);
      console.log("Saved to local storage");
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [fieldState]);

  const addField = () => {
    if (newKind === "text") {
      setFieldState({
        ...fieldState,
        formFields: [
          ...fieldState.formFields,
          {
            kind: newKind,
            id: Number(new Date()),
            label: newLabel,
            fieldType: newTextType,
            value: "",
          },
        ],
      });
    } else if (newKind === "textarea") {
      setFieldState({
        ...fieldState,
        formFields: [
          ...fieldState.formFields,
          {
            kind: newKind,
            id: Number(new Date()),
            label: newLabel,
            value: "",
          },
        ],
      });
    } else if (newKind === "dropdown") {
      setFieldState({
        ...fieldState,
        formFields: [
          ...fieldState.formFields,
          {
            kind: newKind,
            id: Number(new Date()),
            label: newLabel,
            options: [{ id: Number(new Date()), option: "" }],
            value: "",
          },
        ],
      });
    } else if (newKind === "multiselect") {
      setFieldState({
        ...fieldState,
        formFields: [
          ...fieldState.formFields,
          {
            kind: newKind,
            id: Number(new Date()),
            label: newLabel,
            options: [{ id: Number(new Date()), option: "" }],
            value: [],
          },
        ],
      });
    } else if (newKind === "radio") {
      setFieldState({
        ...fieldState,
        formFields: [
          ...fieldState.formFields,
          {
            kind: newKind,
            id: Number(new Date()),
            label: newLabel,
            options: [{ id: Number(new Date()), option: "" }],
            value: "",
          },
        ],
      });
    }
    setNewLabel("");
    setNewKind("text");
    setNewTextType("text");
  };

  const removeField = (id: number) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.filter((field) => field.id !== id),
    });
  };

  const updateLabel = (id: number, label: string) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            label: label,
          };
        }
        return field;
      }),
    });
  };

  const updateTextType = (id: number, type: textFieldTypes) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (id === field.id) {
          return {
            ...field,
            fieldType: type,
          };
        }
        return field;
      }),
    });
  };

  const updateOptions = (id: number, options: fieldOption[]) => {
    setFieldState({
      ...fieldState,
      formFields: fieldState.formFields.map((field) => {
        if (
          id === field.id &&
          (field.kind === "radio" ||
            field.kind === "dropdown" ||
            field.kind === "multiselect")
        ) {
          return {
            ...field,
            options: options,
          };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-4 divide-y">
      <div className="flex mt-2">
        <span className="inline-flex items-center px-3 text-md font-semibold border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600">
          Form title
        </span>
        <input
          type="text"
          id="form-title"
          ref={titleRef}
          value={fieldState.title}
          onChange={(event) =>
            setFieldState({ ...fieldState, title: event.target.value })
          }
          className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Form title"
        />
      </div>
      <div>
        {fieldState.formFields.length > 0 ? (
          <div>
            {
              // eslint-disable-next-line array-callback-return
              fieldState.formFields.map((field) => {
                switch (field.kind) {
                  case "text":
                    return (
                      <div className="my-1" key={field.id}>
                        <h3 className="text-md font-semibold">Text Field</h3>
                        <TextField
                          key={field.id}
                          id={field.id}
                          label={field.label}
                          fieldType={field.fieldType}
                          value={field.value}
                          placeholder="Enter label for Text Field"
                          updateLabelCB={updateLabel}
                          updateTextTypeCB={updateTextType}
                          removeFieldCB={removeField}
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div className="my-1" key={field.id}>
                        <h3 className="text-md font-semibold">Text Area</h3>
                        <TextArea
                          key={field.id}
                          id={field.id}
                          label={field.label}
                          placeholder={"Enter label for Text area"}
                          value={field.value}
                          updateLabelCB={updateLabel}
                          removeFieldCB={removeField}
                        />
                      </div>
                    );
                  case "dropdown":
                    return (
                      <div className="my-1" key={field.id}>
                        <h3 className="text-md font-semibold">Dropdown</h3>
                        <DropdownField
                          id={field.id}
                          label={field.label}
                          placeholder="Enter label for Dropdown"
                          value={field.value}
                          options={field.options}
                          updateOptionsCB={updateOptions}
                          updateLabelCB={updateLabel}
                          removeFieldCB={removeField}
                        />
                      </div>
                    );
                  case "multiselect":
                    return (
                      <div className="my-1" key={field.id}>
                        <h3 className="text-md font-semibold">Multiselect</h3>
                        <MultiSelectField
                          id={field.id}
                          label={field.label}
                          placeholder="Enter label for Dropdown"
                          value={field.value}
                          options={field.options}
                          updateOptionsCB={updateOptions}
                          updateLabelCB={updateLabel}
                          removeFieldCB={removeField}
                        />
                      </div>
                    );
                  case "radio":
                    return (
                      <div className="my-1" key={field.id}>
                        <h3 className="text-md font-semibold">Radio button</h3>
                        <RadioButtonField
                          id={field.id}
                          label={field.label}
                          placeholder="Enter label for Radio button"
                          value={field.value}
                          options={field.options}
                          updateOptionsCB={updateOptions}
                          updateLabelCB={updateLabel}
                          removeFieldCB={removeField}
                        />
                      </div>
                    );
                }
              })
            }
          </div>
        ) : (
          <div>
            <h4 className="font-semibold text-xl my-1">
              There are no fields currently
            </h4>
            <p>You can start adding fields below</p>
          </div>
        )}
      </div>
      <div className="w-full pt-2">
        <label
          htmlFor="add-field"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Add field
        </label>
        <div className="flex">
          <select
            value={newKind}
            onChange={(event) => {
              setNewKind(event.target.value as formField["kind"]);
            }}
            className="items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <option className="w-full bg-gray-300" value="text">
              Text Field
            </option>
            <option className="w-full bg-gray-300" value="textarea">
              Text Area
            </option>
            <option className="w-full bg-gray-300" value="radio">
              Radio button
            </option>
            <option className="w-full bg-gray-300" value="dropdown">
              Dropdown
            </option>
            <option className="w-full bg-gray-300" value="multiselect">
              Multi-Select
            </option>
          </select>
          <input
            type="text"
            id="add-field"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Field name"
          />
          <button
            onClick={addField}
            className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <PlusIcon className={"w-5 h-5"} />
            <span className="ml-2 font-semibold">Add field</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-gray-300 py-2 w-full rounded-lg mt-3 border font-semibold transition-all border-gray-700 text-gray-700"
          onClick={() => saveFormData(fieldState)}
        >
          Save
        </button>
        <Link
          href="/"
          className="text-center bg-gray-300 py-2 w-full rounded-lg mt-3 border font-semibold transition-all border-gray-700 text-gray-7s00"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
