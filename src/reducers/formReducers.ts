import {
  fieldOption,
  formData,
  formField,
  textFieldTypes,
} from "../types/types";

type AddAction = {
  type: "add_field";
  kind: formField["kind"];
  label: string;
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type UpdateTitleAction = {
  type: "update_title";
  title: string;
};

type UpdateLabelAction = {
  type: "update_label";
  id: number;
  label: string;
};

type updateOptionsAction = {
  type: "update_options";
  id: number;
  options: fieldOption[];
};

type updateTextTypeAction = {
  type: "update_text_type";
  id: number;
  fieldType: textFieldTypes;
};

type formActions =
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | updateOptionsAction
  | UpdateLabelAction
  | updateTextTypeAction;

function getNewField(kind: formField["kind"], label: string): formField {
  switch (kind) {
    case "text":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        fieldType: "text",
        value: "",
      };
    case "textarea":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        value: "",
      };
    case "dropdown":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: [],
        value: "",
      };
    case "multiselect":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: [],
        value: [],
      };
    case "radio":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: [],
        value: "",
      };
  }
}

export function reducer(state: formData, action: formActions): formData {
  switch (action.type) {
    case "add_field":
      const newField = getNewField(action.kind, action.label);
      return {
        ...state,
        formFields: [...state.formFields, newField],
      };
    case "remove_field":
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    case "update_title":
      return {
        ...state,
        title: action.title,
      };
    case "update_options":
      const validatedOptions = action.options.filter(
        (opt) => opt.option !== ""
      );
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            action.id === field.id &&
            (field.kind === "radio" ||
              field.kind === "dropdown" ||
              field.kind === "multiselect")
          ) {
            return {
              ...field,
              options: validatedOptions,
            };
          }
          return field;
        }),
      };
    case "update_label":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (action.id === field.id) {
            return {
              ...field,
              label: action.label,
            };
          }
          return field;
        }),
      };
    case "update_text_type":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (action.id === field.id) {
            return {
              ...field,
              fieldType: action.fieldType,
            };
          }
          return field;
        }),
      };
  }
}
