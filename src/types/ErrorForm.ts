export type ErrorType = {
  name: string;
  email: string;
  body: string;
};

export type Actions =
  | { type: 'SET_NAME_ERROR'; message: string }
  | { type: 'SET_EMAIL_ERROR'; message: string }
  | { type: 'SET_BODY_ERROR'; message: string }
  | { type: 'SET_CLEAR' };
