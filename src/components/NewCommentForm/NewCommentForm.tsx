import React, { useReducer, useState } from 'react';
import cn from 'classnames';
import { useComments, usePosts } from '../../context';
import { Comment, CommentFormData } from '../../types';
import { postComment } from '../../utils/postComment';

type FormState = {
  name: string;
  email: string;
  body: string;
  nameError: string;
  emailError: string;
  bodyError: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  body: '',
  nameError: '',
  emailError: '',
  bodyError: '',
};

type FormAction =
  | { type: 'setName'; payload: string }
  | { type: 'setEmail'; payload: string }
  | { type: 'setBody'; payload: string }
  | { type: 'setError' }
  | { type: 'clearForm' };

function formReducer(state: FormState, action: FormAction) {
  switch (action.type) {
    case 'setName':
      return { ...state, nameError: '', name: action.payload };

    case 'setEmail':
      return { ...state, emailError: '', email: action.payload };

    case 'setBody':
      return { ...state, bodyError: '', body: action.payload };

    case 'setError':
      return {
        ...state,
        nameError: !state.name.trim() ? 'Name is required' : '',
        emailError: !state.email.trim() ? ' Email is required' : '',
        bodyError: !state.body.trim() ? 'Enter some text' : '',
      };

    case 'clearForm':
      return initialState;

    default:
      return state;
  }
}

export const NewCommentForm: React.FC = () => {
  // Can't fix because of Prettier
  /* eslint-disable */
  const [{ name, email, body, nameError, emailError, bodyError }, dispatch] =
    useReducer(formReducer, initialState);
  /* eslint-disable */
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { openedPost } = usePosts();

  const { handleAddComment } = useComments();

  const isNoError = name.trim() && email.trim() && body.trim();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'setError' });

    if (openedPost && isNoError) {
      const data: CommentFormData = {
        postId: openedPost.id,
        name,
        email,
        body,
      };

      try {
        setIsSubmitted(true);

        const response = (await postComment(data)) as Comment;

        handleAddComment(response);
        dispatch({ type: 'setBody', payload: '' });
      } catch {
        throw new Error('Something went wrong');
      } finally {
        setIsSubmitted(false);
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={event =>
              dispatch({ type: 'setName', payload: event.target.value })
            }
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': nameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className={cn('control has-icons-left has-icons-right')}>
          <input
            value={email}
            onChange={event =>
              dispatch({ type: 'setEmail', payload: event.target.value })
            }
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': emailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailError}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={body}
            onChange={event =>
              dispatch({ type: 'setBody', payload: event.target.value })
            }
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': bodyError,
            })}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isSubmitted,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={() => dispatch({ type: 'clearForm' })}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
