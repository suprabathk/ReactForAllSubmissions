import {
  fieldOption,
  formData,
  formField,
  textFieldTypes,
} from "../types/formTypes";
import {
  addFieldCall,
  updateFormDescriptionCall,
  updateFormTitle,
} from "../utils/apiUtils";

type AddAction = {
  type: "add_field";
  kind: formField["kind"];
  label: string;
};

type SetFields = {
  type: "set_fields";
  fields: formField[];
};

type SetFormData = {
  type: "set_form_data";
  id: number;
  title: string;
  description: string;
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

type updateFormDescription = {
  type: "update_form_description";
  description: string;
};

export type formActions =
  | updateFormDescription
  | SetFormData
  | SetFields
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | updateOptionsAction
  | UpdateLabelAction
  | updateTextTypeAction;

function getNewField(kind: formField["kind"], label: string): formField {
  switch (kind) {
    case "TEXT":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        fieldType: "text",
        value: "",
      };
    case "TEXTAREA":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        value: "",
      };
    case "DROPDOWN":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: [],
        value: "",
      };
    case "MULTISELECT":
      return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: [],
        value: [],
      };
    case "RADIO":
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
    case "set_fields":
      return {
        ...state,
        formFields: action.fields,
      };
    case "set_form_data":
      return { ...state, title: action.title, description: action.description };
    case "add_field":
      addFieldCall(state.id, {
        label: action.label,
        kind: action.kind,
        options: [],
      });
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
      updateFormTitle(state.id, action.title);
      return {
        ...state,
        title: action.title,
      };
    case "update_form_description":
      updateFormDescriptionCall(state.id, action.description);
      return {
        ...state,
        description: action.description,
      };
    case "update_options":
      const validatedOptions = action.options
        ? action.options.filter((opt) => opt.option !== "")
        : [];
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            action.id === field.id &&
            (field.kind === "RADIO" ||
              field.kind === "DROPDOWN" ||
              field.kind === "MULTISELECT")
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
