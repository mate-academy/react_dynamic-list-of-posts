import { useReducer } from 'react';

type Action = {
  type: 'created_error';
  key: 'nameIsValid' | 'emailIsValid' | 'commentIsValid';
  value: boolean;
};

type State = {
  nameIsValid: boolean;
  emailIsValid: boolean;
  commentIsValid: boolean;
};

type Handlers = {
  setNameIsValid: (value: boolean) => void;
  setEmailIsValid: (value: boolean) => void;
  setCommentIsValid: (value: boolean) => void;
};

const initialState = {
  nameIsValid: true,
  emailIsValid: true,
  commentIsValid: true,
};

const reducer = (state: State, action: Action) => {
  const { type, key, value } = action;

  switch (type) {
    case 'created_error':
      return {
        ...state,
        [key]: value,
      };

    default:
      return state;
  }
};

export const useFormValidate = (): [State, Handlers] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setNameIsValid = (value: boolean) => {
    dispatch({
      type: 'created_error',
      key: 'nameIsValid',
      value,
    });
  };

  const setEmailIsValid = (value: boolean) => {
    dispatch({
      type: 'created_error',
      key: 'emailIsValid',
      value,
    });
  };

  const setCommentIsValid = (value: boolean) => {
    dispatch({
      type: 'created_error',
      key: 'commentIsValid',
      value,
    });
  };

  return [state, { setNameIsValid, setEmailIsValid, setCommentIsValid }];
};
