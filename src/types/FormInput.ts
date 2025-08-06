export interface InputType {
  name: string;
  email: string;
  body: string;
}

export type InputTextActions =
  | { type: 'SET_INPUT_NAME'; message: string }
  | { type: 'SET_INPUT_EMAIL'; message: string }
  | { type: 'SET_INPUT_BODY'; message: string }
  | { type: 'SET_INPUT_CLEAR' };
