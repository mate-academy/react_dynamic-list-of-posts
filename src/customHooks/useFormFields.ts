import { useReducer } from 'react';

enum ActionType {
  'updated_input',
  'cleared_form',
}

type Action = {
  type: ActionType.updated_input;
  key: 'name' | 'email' | 'comment';
  value: string;
} | {
  type: ActionType.cleared_form;
};

type State = {
  name: string;
  email: string;
  comment: string;
};

type Handlers = {
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setComment: (value: string) => void;
  clearForm: () => void;
};

const initialState = {
  name: '',
  email: '',
  comment: '',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.updated_input:
      return {
        ...state,
        [action.key]: action.value,
      };

    case ActionType.cleared_form:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const useFormFields = (): [State, Handlers] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setName = (value: string) => {
    dispatch({
      type: ActionType.updated_input,
      key: 'name',
      value,
    });
  };

  const setEmail = (value: string) => {
    dispatch({
      type: ActionType.updated_input,
      key: 'email',
      value,
    });
  };

  const setComment = (value: string) => {
    dispatch({
      type: ActionType.updated_input,
      key: 'comment',
      value,
    });
  };

  const clearForm = () => {
    dispatch({
      type: ActionType.cleared_form,
    });
  };

  return [state, {
    setName,
    setEmail,
    setComment,
    clearForm,
  }];
};
