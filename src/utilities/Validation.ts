export const isFieldRequired = {
  value: true,
  message: 'This field is required',
};

export const isEmailValid = {
  value: /\S+@\S+\.\S+/,
  message: 'E-mail is not valid',
};

export const isLength = (value: string, length: number) => {
  if (!value) {
    return true;
  }

  return value.length < length ? `Must contain ${length} and more characters` : true;
};
