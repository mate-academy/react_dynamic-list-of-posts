import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  postId: number,
  addComment: (
    name: string,
    email: string,
    body: string,
    postId: number
  ) => Promise<void>
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!value.name || !value.email || !value.body) {
        setIsError({
          name: !value.name,
          email: !value.email,
          body: !value.body,
        });
      } else {
        setIsLoading(true);
        await addComment(value.name, value.email, value.body, postId);
        setValue(current => ({ ...current, body: '' }));
      }
    } catch (error) {
      throw new Error('Unable to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  const clearComment = () => {
    setIsError({
      name: false,
      email: false,
      body: false,
    });
    setValue({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    setIsError({
      name: false,
      email: false,
      body: false,
    });

    setValue(current => {
      const { value: fieldValue, name: fieldName } = event.target;

      return {
        ...current,
        [fieldName]: fieldValue,
      };
    });
  };

  return (
    <form onSubmit={handleOnSubmit} data-cy="NewCommentForm">
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
              { 'is-danger': isError.name },
            )}
            value={value.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.name && (
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
              { 'is-danger': isError.email },
            )}
            value={value.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.email && (
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
              { 'is-danger': isError.email },
            )}
            value={value.body}
            onChange={handleChange}
          />
        </div>

        {isError.body && (
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
              'button is-link',
              { 'is-loading': isLoading },
            )}
            onClick={() => addComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
