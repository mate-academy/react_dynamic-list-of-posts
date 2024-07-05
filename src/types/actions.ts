import { FormError } from './errors';

type ChangeNameAction = {
  type: 'changeName';
  payload: {
    newName: string;
  };
};

type ChangeEmailAction = {
  type: 'changeEmail';
  payload: {
    newEmail: string;
  };
};

type ChangeTextAction = {
  type: 'changeText';
  payload: {
    newText: string;
  };
};

type ClearFormAction = {
  type: 'clearForm';
};

type ClearTextAction = {
  type: 'clearText';
};

type StartLoadingAction = {
  type: 'startLoading';
};

type FinishLoadingAction = {
  type: 'finishLoading';
};

type HandleFormErrorAction = {
  type: 'handleFormError';
  payload: {
    formError: FormError;
  };
};

export type NewCommentFormAction =
  | ChangeNameAction
  | ChangeEmailAction
  | ChangeTextAction
  | ClearFormAction
  | ClearTextAction
  | StartLoadingAction
  | FinishLoadingAction
  | HandleFormErrorAction;
