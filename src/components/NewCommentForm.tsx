/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import classNames from 'classnames';

interface NewCommentFormProps {
  commentAdd: (name: string, email: string, comment: string) => void,
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  commentAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [commentLoading, setIsCommentLoading] = useState(false);
  const [validSubmit, setValidSubmit] = useState(true);

  const handleFormClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setValidSubmit(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && body) {
      setIsCommentLoading(true);
      setValidSubmit(true);

      commentAdd(name, email, body);
    }

    setIsCommentLoading(false);
    setBody('');
  };

  const validInput = (inputType: string) => !validSubmit && inputType;

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
            className={classNames('input',
              {
                'is-danger': validInput(name),
              })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {validInput(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validInput(name) && (
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
            className={classNames('input',
              {
                'is-danger': validInput(email),
              })}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {validInput(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validInput(email) && (
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
              'is-danger': validInput(body),
            })}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {validInput(body) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': commentLoading },
            )}

          >
            Add
          </button>
        </div>

        <div className="control">
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
