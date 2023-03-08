import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import { addPostComment } from '../helpers';

type Props = {
  postId: number | null,
  setIsError: (value: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, setIsError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = useCallback(
    (f:(value: string) => void, event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;

      if (name) {
        setIsNameError(false);
      }

      if (email) {
        setIsEmailError(false);
      }

      if (text) {
        setIsTextError(false);
      }

      if (value !== ' ') {
        f(value);
      }
    }, [email, name, text],
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!name) {
      setIsNameError(true);
    }

    if (!email) {
      setIsEmailError(true);
    }

    if (!text) {
      setIsTextError(true);
    }

    if (postId && name && email && text) {
      const newComment = {
        postId,
        name,
        email,
        body: text,
      };

      try {
        await addPostComment(postId, newComment);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    }

    setIsLoading(false);
    setText('');
  };

  const resetFields = () => {
    setName('');
    setEmail('');
    setText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(event) => onSubmit(event)}>
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
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
            value={name}
            onChange={(event) => handleFieldChange(setName, event)}
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
            className={classNames(
              'input',
              { 'is-danger': isEmailError },
            )}
            value={email}
            onChange={(event) => handleFieldChange(setEmail, event)}

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
            className={classNames(
              'textarea',
              { 'is-danger': isTextError },
            )}
            value={text}
            onChange={(event) => handleFieldChange(setText, event)}

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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
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
            onClick={resetFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
