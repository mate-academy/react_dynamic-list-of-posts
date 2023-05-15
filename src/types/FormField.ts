export type FormFieldsNames = 'name' | 'email' | 'body';

export type FormField = {
  name: FormFieldsNames,
  label: string,
  id: string,
  placeholder: string,
  icon: string,
};
