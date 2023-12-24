import { Form } from '../../types/Form';

export const validateForm = (
  formInputs: Form<string>,
  setFormErrors: (React.Dispatch<React.SetStateAction<Form<boolean>>>),
) => {
  const fields = Object.keys(formInputs);
  let hasError = true;

  fields.forEach(key => {
    if (!formInputs[key as keyof typeof formInputs]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [key]: true,
      }));

      hasError = false;
    }
  });

  return hasError;
};
