import React, { useState } from 'react';
import classNames from 'classnames';
import { ErrorMessages } from '../types/ErrorMessages';
import { Comment } from '../types/Comment';
import { addComment } from '../api/coments';

type Props = {
  postId: number | undefined,
  createNewComment: (comment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  createNewComment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidateError, setIsValidateError] = useState(false);

  const [formValue, setFormValue] = useState<Partial<Comment>>({
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = formValue;

  const handleChange = (e:React
    .ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClear = () => {
    setFormValue(() => {
      return {
        name: '',
        email: '',
        body: '',
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name?.length === 0 || email?.length === 0 || body?.length === 0) {
      setIsValidateError(true);

      return;
    }

    setIsValidateError(false);
    setIsLoading(true);

    addComment({ ...formValue, postId })
      .then(createNewComment)
      .catch()
      .finally(() => {
        setIsLoading(false);
      });
    setFormValue((prevState) => ({
      ...prevState,
      body: '',
    }));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            className={classNames('input', {
              'is-danger': isValidateError && !name,
            })}
            value={name}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isValidateError && !name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!name && isValidateError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.NameIsRequired}
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
            className={classNames('input', {
              'is-danger': isValidateError && !email,
            })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isValidateError && !email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!email && isValidateError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.EmailIsRequired}
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
            className={classNames('textarea', {
              'is-danger': isValidateError && !body,
            })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {!body && isValidateError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.TextIsRequired}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
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
