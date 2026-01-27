import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  addComment: (name: string, email: string, body: string) => Promise<void>;
  isAdding: boolean;
};

export const NewCommentForm: React.FC<Props> = ({ addComment, isAdding }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    text: false,
  });

  const clear = () => {
    setName('');
    setEmail('');
    setText('');
    setErrors({ name: false, email: false, text: false });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      name: !name.trim(),
      email: !email.trim(),
      text: !text.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    await addComment(name.trim(), email.trim(), text.trim());

    setText('');
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
              'is-danger': errors.name,
            })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setErrors(prev => ({ ...prev, name: false }));
            }}
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
              'is-danger': errors.email,
            })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setErrors(prev => ({ ...prev, email: false }));
            }}
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
              'is-danger': errors.text,
            })}
            value={text}
            onChange={event => {
              setText(event.target.value);
              setErrors(prev => ({ ...prev, text: false }));
            }}
          />
        </div>

        {errors.text && (
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
              'is-loading': isAdding,
            })}
            disabled={isAdding}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
            disabled={isAdding}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
