import classNames from 'classnames';
import React, { useReducer } from 'react';
import { HandleCommentAdd } from '../types/handlers';
import { Notification } from './Notification';
import { FormError } from '../types/errors';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { NewCommentFormState } from '../types/states';
import { NewCommentFormAction } from '../types/actions';

const reducer = (
  state: NewCommentFormState,
  action: NewCommentFormAction,
): NewCommentFormState => {
  switch (action.type) {
    case 'changeName':
      return {
        ...state,
        name: action.payload.newName,
        nameError: false,
      };
    case 'changeEmail':
      return {
        ...state,
        email: action.payload.newEmail,
        emailError: false,
      };
    case 'changeText':
      return {
        ...state,
        text: action.payload.newText,
        textError: false,
      };
    case 'clearForm':
      return {
        ...state,
        name: '',
        email: '',
        text: '',
        nameError: false,
        emailError: false,
        textError: false,
      };
    case 'clearText':
      return {
        ...state,
        text: '',
      };
    case 'startLoading':
      return {
        ...state,
        isLoading: true,
        sendError: false,
      };
    case 'finishLoading':
      return {
        ...state,
        isLoading: false,
      };
    case 'handleFormError': {
      const { sendError, nameError, emailError, textError } =
        action.payload.formError;

      return {
        ...state,
        sendError: !!sendError,
        nameError: !!nameError,
        emailError: !!emailError,
        textError: !!textError,
      };
    }

    default:
      throw new Error('Action is not valid!!!');
  }
};

type Props = {
  onCommentAdd: HandleCommentAdd;
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdd }) => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    email: '',
    text: '',
    isLoading: false,
    sendError: false,
    nameError: false,
    emailError: false,
    textError: false,
  });

  const {
    name,
    email,
    text,
    isLoading,
    sendError,
    nameError,
    emailError,
    textError,
  } = state;

  const handleNameChange = (newName: string) => {
    dispatch({ type: 'changeName', payload: { newName } });
  };

  const handleEmailChange = (newEmail: string) => {
    dispatch({ type: 'changeEmail', payload: { newEmail } });
  };

  const handleTextChange = (newText: string) => {
    dispatch({ type: 'changeText', payload: { newText } });
  };

  const handleClearClick = () => {
    dispatch({ type: 'clearForm' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'startLoading' });

    try {
      await onCommentAdd(name, email, text);
      dispatch({ type: 'clearText' });
    } catch (error) {
      if (error instanceof FormError) {
        dispatch({ type: 'handleFormError', payload: { formError: error } });
      } else {
        throw new Error('Error is unknown!!!');
      }
    } finally {
      dispatch({ type: 'finishLoading' });
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <InputField
        value={name}
        error={nameError}
        name="NameField"
        label="Author Name"
        placeholder="Name Surname"
        errorMessage="Name is required"
        icon="fa-user"
        onChange={handleNameChange}
      />

      <InputField
        value={email}
        error={emailError}
        name="EmailField"
        label="Author Email"
        placeholder="email@test.com"
        errorMessage="Email is required"
        icon="fa-envelope"
        onChange={handleEmailChange}
      />

      <TextareaField
        value={text}
        error={textError}
        name="BodyField"
        label="Comment Text"
        placeholder="Type comment here"
        errorMessage="Enter some text"
        onChange={handleTextChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>

      {sendError && <Notification message="Something went wrong" error />}
    </form>
  );
};
