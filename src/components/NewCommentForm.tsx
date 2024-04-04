import React, { Dispatch, SetStateAction, useState } from 'react';
import { addComment } from '../api/comments';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setIsNewCommentError: (newState: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setIsNewCommentError,
}) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [nameError, setNameError] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setAuthorName(event.target.value);
  };

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setAuthorEmail(event.target.value);
  };

  const handleOnTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextError(false);
    setText(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!authorName || !authorEmail || !text) {
      setNameError(!authorName);
      setEmailError(!authorEmail);
      setTextError(!text);

      return;
    }

    setIsLoading(true);

    const newComment = {
      postId: postId,
      name: authorName,
      email: authorEmail,
      body: text,
    };

    addComment(newComment)
      .then(commentToAdd => {
        setComments((prevComments: Comment[]) => [
          ...prevComments,
          commentToAdd as Comment,
        ]);
        setText('');
      })
      .catch(() => setIsNewCommentError(true))
      .finally(() => setIsLoading(false));
  };

  const handleOnClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setText('');

    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={authorName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
            onChange={handleOnNameChange}
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
            type="email"
            name="email"
            value={authorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
            onChange={e => handleOnEmailChange(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            value={text}
            placeholder="Type comment here"
            className={classNames('input', { 'is-danger': textError })}
            onChange={handleOnTextChange}
          />
        </div>

        {textError && (
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
            onClick={handleOnSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleOnClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
