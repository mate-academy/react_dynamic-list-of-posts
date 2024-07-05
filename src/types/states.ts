export type NewCommentFormState = {
  name: string;
  email: string;
  text: string;
  isLoading: boolean;
  sendError: boolean;
  nameError: boolean;
  emailError: boolean;
  textError: boolean;
};
