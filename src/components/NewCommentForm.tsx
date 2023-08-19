import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  addNewComment: (newComment: CommentData) => Promise<void>
};
const emptyComment = {
  name: '',
  email: '',
  text: '',
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment }) => {
  const [isNamePresent, setIsNamePresent] = useState<boolean>(true);
  const [isEmailPresent, setIsEmailPresent] = useState<boolean>(true);
  const [isTextPresent, setIsTextPresent] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comment, setComment] = useState(emptyComment);
  const { name, email, text } = comment;

  const handleReset = () => {
    setComment(emptyComment);

    setIsNamePresent(true);
    setIsEmailPresent(true);
    setIsTextPresent(true);
  };

  const handleChange = (
    event: React.ChangeEvent <HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const title = event.target.name;
    const { value } = event.target;

    setComment(prevState => ({ ...prevState, [title]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsNamePresent(!!name);
    setIsEmailPresent(!!email);
    setIsTextPresent(!!text);

    if (name && email && text) {
      setIsLoading(true);
      addNewComment({ name, email, body: text })
        .then(() => setIsLoading(false))
        .finally(() => setComment(prevValue => ({ ...prevValue, text: '' })));
    }
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
              'is-danger': !isNamePresent,
            })}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNamePresent && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNamePresent && (
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
              'is-danger': !isEmailPresent,
            })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailPresent && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmailPresent && (
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
            name="text"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': !isTextPresent,
            })}
            value={text}
            onChange={handleChange}
          />
        </div>

        {!isTextPresent && (
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
