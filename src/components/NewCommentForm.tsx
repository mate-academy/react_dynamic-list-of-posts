import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

interface NewCommentFormProps {
  onCommentAdd: (comment: CommentData) => Promise<void>,
}
export const NewCommentForm: React.FC<NewCommentFormProps>
= ({ onCommentAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isCommentBeingAdd, setIsCommentBeingAdd] = useState(false);
  const [isValidSubmission, setIsValidSubmission] = useState(true);

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && body) {
      const newComment = {
        name,
        email,
        body,
      };

      setIsCommentBeingAdd(true);
      setIsValidSubmission(true);

      onCommentAdd(newComment)
        .then(() => setBody(' '))
        .finally(() => setIsCommentBeingAdd(false));
    } else {
      setIsValidSubmission(false);
    }
  };

  const handleFormClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsValidSubmission(true);
  };

  const isValidInput = (inputType: string) => !isValidSubmission && !inputType;

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmission}>
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
              'is-danger': isValidInput(name),
            })}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isValidInput(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isValidInput(name) && (
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
            className={classNames('input', {
              'is-danger': isValidInput(email),
            })}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isValidInput(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isValidInput(email) && (
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
            className={classNames('textarea', {
              'is-danger': isValidInput(body),
            })}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>

        {isValidInput(body) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isCommentBeingAdd,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
