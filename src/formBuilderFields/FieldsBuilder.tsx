import React from "react";
import { formField } from "../types/formTypes";
import { DropdownField } from "./DropdownField";
import { MultiSelectField } from "./MultiSelectField";
import { RadioButtonField } from "./RadioButtonField";
import { TextField } from "./TextField";
import { formActions } from "../reducers/formReducers";
import { UpAndDownIcon } from "../AppIcons";

export function FieldsBuilder({
  field,
  dispatch,
}: {
  field: formField;
  dispatch: React.Dispatch<formActions>;
}) {
  return (
    <div>
      {(() => {
        switch (field.kind) {
          case "TEXT":
            return (
              <div className="my-1" key={field.id}>
                <div className="flex gap-2 items-center group">
                  <UpAndDownIcon className="w-4 h-4 hidden group-hover:block" />
                  <h3 className="text-md font-semibold">Text Field</h3>
                </div>
                {field.label === "" && (
                  <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                    Label cannot be empty.
                  </div>
                )}
                <TextField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  fieldType={field.meta.description.fieldType}
                  value={field.value}
                  placeholder="Enter label for Text Field"
                  updateLabelCB={(id, label) => {
                    dispatch({
                      type: "update_label",
                      id: id,
                      label: label,
                    });
                  }}
                  updateTextTypeCB={(id, fieldType) => {
                    dispatch({
                      type: "update_text_type",
                      id: id,
                      fieldType: fieldType,
                    });
                  }}
                  removeFieldCB={(id) =>
                    dispatch({
                      type: "remove_field",
                      id: id,
                    })
                  }
                />
              </div>
            );
          case "DROPDOWN":
            return (
              <div className="my-1" key={field.id}>
                <div className="flex gap-2 items-center group">
                  <UpAndDownIcon className="w-4 h-4 hidden group-hover:block" />
                  <h3 className="text-md font-semibold">Dropdown</h3>
                </div>
                {field.label === "" && (
                  <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                    Label cannot be empty.
                  </div>
                )}
                <DropdownField
                  id={field.id}
                  label={field.label}
                  placeholder="Enter label for Dropdown"
                  value={field.value}
                  options={field.options}
                  updateOptionsCB={(id, options) => {
                    dispatch({
                      type: "update_options",
                      id: id,
                      options: options,
                    });
                  }}
                  updateLabelCB={(id, label) => {
                    dispatch({
                      type: "update_label",
                      id: id,
                      label: label,
                    });
                  }}
                  removeFieldCB={(id) =>
                    dispatch({
                      type: "remove_field",
                      id: id,
                    })
                  }
                />
              </div>
            );
          case "GENERIC":
            return (
              <div className="my-1" key={field.id}>
                <div className="flex gap-2 items-center group">
                  <UpAndDownIcon className="w-4 h-4 hidden group-hover:block" />
                  <h3 className="text-md font-semibold">Multiselect</h3>
                </div>
                {field.label === "" && (
                  <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                    Label cannot be empty.
                  </div>
                )}
                <MultiSelectField
                  id={field.id}
                  label={field.label}
                  placeholder="Enter label for Dropdown"
                  value={field.value}
                  options={field.options}
                  updateOptionsCB={(id, options) => {
                    dispatch({
                      type: "update_options",
                      id: id,
                      options: options,
                    });
                  }}
                  updateLabelCB={(id, label) => {
                    dispatch({
                      type: "update_label",
                      id: id,
                      label: label,
                    });
                  }}
                  removeFieldCB={(id) =>
                    dispatch({
                      type: "remove_field",
                      id: id,
                    })
                  }
                />
              </div>
            );
          case "RADIO":
            return (
              <div className="my-1" key={field.id}>
                <div className="flex gap-2 items-center group">
                  <UpAndDownIcon className="w-4 h-4 hidden group-hover:block" />
                  <h3 className="text-md font-semibold">Radio button</h3>
                </div>
                {field.label === "" && (
                  <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                    Label cannot be empty.
                  </div>
                )}
                <RadioButtonField
                  id={field.id}
                  label={field.label}
                  placeholder="Enter label for Radio button"
                  value={field.value}
                  options={field.options}
                  updateOptionsCB={(id, options) => {
                    dispatch({
                      type: "update_options",
                      id: id,
                      options: options,
                    });
                  }}
                  updateLabelCB={(id, label) => {
                    dispatch({
                      type: "update_label",
                      id: id,
                      label: label,
                    });
                  }}
                  removeFieldCB={(id) =>
                    dispatch({
                      type: "remove_field",
                      id: id,
                    })
                  }
                />
              </div>
            );
        }
      })()}
    </div>
  );
}
