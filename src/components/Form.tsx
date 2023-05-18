import React, { useEffect, useReducer, useRef, useState } from "react";
import { PlusIcon } from "../AppIcons";
import { formField } from "../types/formTypes";
import { Link, navigate } from "raviger";
import { formActions, reducer } from "../reducers/formReducers";
import {
  addFieldCall,
  fetchFormData,
  fetchFormFields,
  updateFields,
} from "../utils/apiUtils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { FieldsBuilder } from "../formBuilderFields/FieldsBuilder";
import ShareForm from "../customComponents/ShareForm";

const fetchForm = (formID: number, dispatch: React.Dispatch<formActions>) => {
  fetchFormData(formID).then((data) => {
    dispatch({
      type: "set_form_data",
      id: formID,
      title: data.title,
      description: data.description,
    });
  });
  fetchFormFields(formID).then((data) => {
    dispatch({
      type: "set_fields",
      fields: data.results,
    });
  });
};

export default function Form(props: { id: number }) {
  const [fieldState, dispatch] = useReducer(reducer, {
    id: props.id,
    title: "",
    formFields: [],
  });
  const [newLabel, setNewLabel] = useState("");
  const [newKind, setNewKind] = useState<formField["kind"]>("TEXT");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const addFormField = (
    formID: number,
    label: string,
    kind: formField["kind"]
  ) => {
    addFieldCall(formID, {
      label: label,
      kind: kind,
      meta: {
        description: {
          fieldType: "text",
        },
      },
    }).then((data) =>
      dispatch({
        type: "add_field",
        label: newLabel,
        kind: newKind,
        newField: data,
      })
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let _formFields = fieldState.formFields;
    _formFields.splice(
      destination.index,
      0,
      _formFields.splice(source.index, 1)[0]
    );
    dispatch({
      type: "set_fields",
      fields: _formFields,
    });
    updateFields(fieldState.id, _formFields);
  };

  useEffect(() => {
    fieldState.id !== props.id && navigate(`/form/${fieldState.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldState.id]);

  useEffect(() => {
    fetchForm(props.id, dispatch);
    titleRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 divide-y">
      <div>
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
              dispatch({ type: "update_title", title: event.target.value })
            }
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-r-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Form title"
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="inline-flex items-center px-3 text-md font-semibold border border-b-0 rounded-t-md bg-gray-300 text-gray-700 border-gray-600">
            Description
          </span>
          <textarea
            name="description"
            id="description"
            value={fieldState.description}
            onChange={(event) =>
              dispatch({
                type: "update_form_description",
                description: event.target.value,
              })
            }
            className="rounded-none border block flex-1 min-w-0 w-full text-sm p-2.5 rounded-b-md bg-gray-100 border-gray-600 placeholder-gray-400 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <ShareForm formID={fieldState.id} />
      </div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId="column">
          {(provided) =>
            fieldState.formFields && (
              <div>
                <div ref={provided.innerRef}>
                  {fieldState.formFields.length > 0 ? (
                    <div className="flex flex-col">
                      {
                        // eslint-disable-next-line array-callback-return
                        fieldState.formFields.map((field, index) => (
                          <Draggable
                            draggableId={`${index}`}
                            index={index}
                            key={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <FieldsBuilder
                                  field={field}
                                  dispatch={dispatch}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
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
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      <div className="w-full pt-2">
        <label
          htmlFor="add-field"
          className="block mb-1 text-sm font-medium text-gray-700 w-full"
        >
          Add field
        </label>
        {error && (
          <div className="bg-red-200 border border-red-600 px-2 rounded-md text-red-600">
            {error}
          </div>
        )}
        <div className="flex mt-1 w-full">
          <select
            value={newKind}
            onChange={(event) => {
              setNewKind(event.target.value as formField["kind"]);
            }}
            className="items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <option className="w-full bg-gray-300" value="TEXT">
              Text Field
            </option>
            <option className="w-full bg-gray-300" value="RADIO">
              Radio button
            </option>
            <option className="w-full bg-gray-300" value="DROPDOWN">
              Dropdown
            </option>
            <option className="w-full bg-gray-300" value="GENERIC">
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
            onClick={(_) => {
              if (newLabel === "") {
                return setError("Label cannot be empty");
              }
              setError("");
              setNewKind("TEXT");
              setNewLabel("");
              addFormField(fieldState.id, newLabel, newKind);
            }}
            className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md bg-gray-300 text-gray-700 border-gray-600"
          >
            <PlusIcon className={"w-5 h-5"} />
            <span className="ml-2 font-semibold">Add field</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
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
