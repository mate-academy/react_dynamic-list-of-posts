import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isNameInputError, setIsNameInputError] = useState(false);
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [isBodyInputError, setIsBodyInputError] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleInputError = () => {
    setIsNameInputError(!name);
    setIsEmailInputError(!email);
    setIsBodyInputError(!body);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const resetError = () => {
    setIsNameInputError(false);
    setIsEmailInputError(false);
    setIsBodyInputError(false);
  };

  const addCommentToServer = async (event: FormEvent) => {
    event.preventDefault();
    handleInputError();

    if (name && email && body) {
      try {
        setIsFormLoading(true);
        await onAddComment({
          name,
          email,
          body,
        });
        resetError();
        setBody('');
      } finally {
        setIsFormLoading(false);
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addCommentToServer}
    >
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
            className={classNames('input', { 'is-danger': isNameInputError })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          { isNameInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        { isNameInputError && (
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
            className={classNames('input', { 'is-danger': isEmailInputError })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          { isEmailInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        { isEmailInputError && (
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
            className={classNames('textarea',
              { 'is-danger': isBodyInputError })}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          />
        </div>

        { isBodyInputError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isFormLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
