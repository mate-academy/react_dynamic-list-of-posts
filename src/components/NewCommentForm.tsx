import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/comments';
import { DispatchContext } from '../Store';

type Props = {
  id: number;
};

export const NewCommentForm: React.FC<Props> = ({ id }) => {
  const dispatch = useContext(DispatchContext);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [mail, setMail] = useState('');
  const [mailError, setMailError] = useState(false);

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError(!name.trim());
    setMailError(!mail.trim());
    setBodyError(!body.trim());

    if (name.trim().length === 0) {
      setName('');

      return;
    }

    if (mail.trim().length === 0) {
      setMail('');

      return;
    }

    if (body.trim().length === 0) {
      setBody('');

      return;
    }

    setIsLoading(true);

    const comment = {
      postId: id,
      name: name.trim(),
      email: mail.trim(),
      body: body.trim(),
    };

    addComment(comment)
      .then(request => dispatch({ type: 'addComment', comment: request }))
      .finally(() => setIsLoading(false));

    setBody('');
  };

  const handleClear = () => {
    setName('');
    setMail('');
    setBody('');
    setNameError(false);
    setMailError(false);
    setBodyError(false);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
    setMailError(false);
  };

  const handleArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': nameError,
            })}
            onChange={handleName}
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
            value={mail}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': mailError,
            })}
            onChange={handleMail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {mailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {mailError && (
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
            value={body}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', {
              'is-danger': bodyError,
            })}
            onChange={handleArea}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

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
