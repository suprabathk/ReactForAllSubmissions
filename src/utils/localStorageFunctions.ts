import { formData, formField } from "../types/formTypes";

export const saveLocalForms: (localForms: formData[]) => void = (
  localForms: formData[]
) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const currentValidatedState = {
    ...currentState,
    // eslint-disable-next-line array-callback-return
    formFields: currentState.formFields.filter((field) => {
      if (
        field.kind === "dropdown" ||
        field.kind === "multiselect" ||
        field.kind === "radio"
      ) {
        return field.options.length > 0 && field.label !== "";
      } else {
        return field.label !== "";
      }
    }),
  };
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentValidatedState : form
  );
  saveLocalForms(updatedLocalForms);
};

export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export const getInitialFormData: (
  id: number,
  initialFormFields: formField[]
) => formData = (id, initialFormFields) => {
  const localForms = getLocalForms();
  if (localForms.length > 0) {
    for (let form of localForms) {
      if (form.id === id) {
        return form;
      }
    }
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

export const getFormData: (id: number) => formData = (id) => {
  const localForms = getLocalForms();
  return localForms.filter((form) => form.id === id)[0];
};
