import { formData, formField } from "../types/types";

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
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
