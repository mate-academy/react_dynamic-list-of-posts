import cn from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { createComment } from '../api/api';

type Props = {
  postId: number;
  setIsError: (value: boolean) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setIsError,
}) => {
  const [formState, setFormState] = useState({
    nameQuery: '',
    nameInvalid: false,
    emailQuery: '',
    emailInvalid: false,
    commentQuery: '',
    commentInvalid: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onNameChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      nameQuery: value,
      nameInvalid: false,
    }));
  };

  const onEmailChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      emailQuery: value,
      emailInvalid: false,
    }));
  };

  const onCommentChange = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      commentQuery: value,
      commentInvalid: false,
    }));
  };

  const handleClear = () => {
    setFormState({
      nameQuery: '',
      nameInvalid: false,
      emailQuery: '',
      emailInvalid: false,
      commentQuery: '',
      commentInvalid: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = formState.nameQuery.trim();
    const email = formState.emailQuery.trim();
    const body = formState.commentQuery.trim();

    setFormState(prev => ({
      ...prev,
      nameInvalid: name === '',
      emailInvalid: email === '',
      commentInvalid: body === '',
    }));

    if (!name || !email || !body) {
      return;
    }

    setIsLoading(true);

    try {
      const newComment = await createComment({ postId, name, email, body });

      setComments(currComments => [...currComments, newComment]);
      setFormState(prev => ({
        ...prev,
        commentQuery: '',
      }));
    } catch (err) {
      setIsError(true);
      setFormState(prev => ({
        ...prev,
        commentQuery: formState.commentQuery,
      }));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleSubmit(event)}>
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
            className={cn('input', { 'is-danger': formState.nameInvalid })}
            value={formState.nameQuery}
            onChange={e => onNameChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formState.nameInvalid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.nameInvalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': formState.emailInvalid })}
            value={formState.emailQuery}
            onChange={e => onEmailChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formState.emailInvalid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formState.emailInvalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
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
            className={cn('textarea', {
              'is-danger': formState.commentInvalid,
            })}
            value={formState.commentQuery}
            onChange={e => onCommentChange(e.target.value)}
          />
        </div>

        {formState.commentInvalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
