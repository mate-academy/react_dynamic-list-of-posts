import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';

type Props = {
  postId: number | undefined,
  addComment: (comment: {}) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [isLoadong, setIsLoading] = useState(false);

  const handleInput = (value: string, names: string) => {
    switch (names) {
      case 'name':
        setError(error);
        setName(value);
        break;
      case 'email':
        setError(error);
        setEmail(value);
        break;
      case 'body':
        setError(error);
        setBody(value);
        break;
      default:
        break;
    }
  };

  const changeForm = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || !body) {
      setError({
        name: !name,
        email: !email,
        body: !body,
      });

      return;
    }

    if (!postId) {
      return;
    }

    setIsLoading(true);

    const data = {
      postId,
      name,
      email,
      body,

    };

    addComment(data);

    setBody('');
    setIsLoading(false);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setError({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={changeForm}
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
            className={classNames('input', { 'is-danger': error.name })}
            value={name}
            onChange={(event) => {
              handleInput(event.target.value, event.target.name);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {error.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {error.name && (
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
            type="email"
            name="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': error.email })}
            value={email}
            onChange={(event) => {
              handleInput(event.target.value, event.target.name);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {error.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {error.email && (
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
            className={classNames('input', { 'is-danger': error.body })}
            value={body}
            onChange={(event) => {
              handleInput(event.target.value, event.target.name);
            }}
          />
        </div>

        {error.body && (
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
              'button', 'is-link',
              { 'is-loading': isLoadong },
            )}

          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
