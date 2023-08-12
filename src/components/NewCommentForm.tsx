import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  addComment: (
    email: string,
    body: string,
    name: string,
    postId: number,
  ) => Promise<void>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ addComment, postId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [text, setText] = useState<string>('');

  const [isNameError, setNameError] = useState<boolean>(false);
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isTextError, setTextError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const changNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value);
    setNameError(false);
  };

  const changEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const changTextHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(event.target.value);
    setTextError(false);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setNameError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!text.trim()) {
      setTextError(true);
    }

    if (!name.trim() || !email.trim() || !text.trim()) {
      return;
    }

    try {
      setLoading(true);
      await addComment(email, text, name, postId);
    } finally {
      setLoading(false);
      setText('');
    }
  };

  const resetFields = () => {
    setName('');
    setEmail('');
    setText('');

    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmitHandler}>
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
              'is-danger': isNameError,
            })}
            value={name}
            onChange={changNameHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={changEmailHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
              'is-danger': isTextError,
            })}
            value={text}
            onChange={changTextHandler}
          />
        </div>

        {isTextError && (
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
              'is-loading': loading,
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
            onClick={resetFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
