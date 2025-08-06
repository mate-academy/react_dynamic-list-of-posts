import { InputTextActions, InputType } from '../types/FormInput';

export const initText: InputType = {
  name: '',
  email: '',
  body: '',
};

export const inputTextReducer = (
  inputState: InputType,
  inpuAction: InputTextActions,
) => {
  switch (inpuAction.type) {
    case 'SET_INPUT_NAME':
      return { ...inputState, name: inpuAction.message };

    case 'SET_INPUT_EMAIL':
      return { ...inputState, email: inpuAction.message };

    case 'SET_INPUT_BODY':
      return { ...inputState, body: inpuAction.message };

    case 'SET_INPUT_CLEAR':
      return initText;

    default:
      return inputState;
  }
};
