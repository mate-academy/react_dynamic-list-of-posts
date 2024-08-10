import React, { useReducer, useState } from 'react';
import { useValues } from '../SharedContext';
import cn from 'classnames';
import { Messages } from './constants/Messages';

type Action =
  | { type: 'changeName'; payload: { newName: string } }
  | { type: 'changeEmail'; payload: { newEmail: string } }
  | { type: 'changeBody'; payload: { newBody: string } };

interface State {
  name: string;
  email: string;
  body: string;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'changeName':
      return { ...state, name: action.payload.newName };
    case 'changeEmail':
      return { ...state, email: action.payload.newEmail };
    case 'changeBody':
      return { ...state, body: action.payload.newBody };
    default:
      return state;
  }
}

const initialValue: State = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const { isSumbitting, handleCreateComment } = useValues();
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = state;

  const handleChangeName = (newName: string) => {
    dispatch({ type: 'changeName', payload: { newName } });
    setErrors(prevErrors => ({ ...prevErrors, name: '' }));
  };

  const handleChangeEmail = (newEmail: string) => {
    dispatch({ type: 'changeEmail', payload: { newEmail } });
    setErrors(prevErrors => ({ ...prevErrors, email: '' }));
  };

  const handleChangeText = (newBody: string) => {
    dispatch({ type: 'changeBody', payload: { newBody } });
    setErrors(prevErrors => ({ ...prevErrors, body: '' }));
  };

  const reset = () => {
    dispatch({ type: 'changeBody', payload: { newBody: '' } });
  };

  const handleSubmitNewComment = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = { name: '', email: '', body: '' };

    if (!name.trim().length) {
      newErrors.name = Messages.nameRequiredMessage;
    }

    if (!email.trim().length) {
      newErrors.email = Messages.emailRequiredMessage;
    }

    if (!body.trim().length) {
      newErrors.body = Messages.bodyRequiredMessage;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err)) {
      return;
    }

    try {
      await handleCreateComment({ name, email, body });

      reset();
    } catch { }
  };

  const handleResetButton = () => {
    dispatch({ type: 'changeName', payload: { newName: '' } });
    dispatch({ type: 'changeEmail', payload: { newEmail: '' } });
    dispatch({ type: 'changeBody', payload: { newBody: '' } });
    setErrors({ name: '', email: '', body: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitNewComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': errors.name })}
            value={name}
            onChange={e => handleChangeName(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': errors.email })}
            value={email}
            onChange={e => handleChangeEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={e => handleChangeText(e.target.value)}
          />
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': isSumbitting,
            })}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
