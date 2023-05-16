export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
};

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};

export type textFieldTypes = "text" | "email" | "date" | "tel" | "time";

type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

type DropdownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: fieldOption[];
  value: string;
};

export type MultiSelect = {
  kind: "multiselect";
  id: number;
  label: string;
  options: fieldOption[];
  value: string[];
};

type TextArea = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
};

export type RadioButton = {
  kind: "radio";
  id: number;
  label: string;
  value: string;
  options: fieldOption[];
};

export type formField =
  | TextField
  | DropdownField
  | TextArea
  | RadioButton
  | MultiSelect;

export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type fieldAnswer = {
  id: number;
  ans: string | string[];
};

export type fieldOption = {
  id: number;
  option: string;
};

export type currentlyPreviewedQuestion = {
  index: number;
  currentQuestion: formField;
};
