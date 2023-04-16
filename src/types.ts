export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface fieldAnswer {
  id: number;
  ans: string;
}
