import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { addComment } from '../../api/posts';

type Props = {
  setIsErrorComments: (v: boolean) => void,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({
  setIsErrorComments,
  setComments,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('Email is required');
  const [isEmailError, setIsEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('Email is required');
    setIsLoading(true);

    setIsNameError(!name);
    setIsEmailError(!email);
    setIsCommentError(!commentText);

    if (!name || !email || !commentText) {
      setIsLoading(false);

      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setIsEmailError(true);
      setErrorMessage('Email is invalid');
      setIsLoading(false);

      return;
    }

    const comment: Omit<Comment, 'id'> = {
      postId,
      name,
      email,
      body: commentText,
    };

    addComment(comment)
      .then(newComment => {
        setComments((prevState) => [...prevState, newComment]);
      })
      .catch(() => setIsErrorComments(true))
      .finally(() => {
        setCommentText('');
        setIsLoading(false);
      });
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setIsNameError(false);
            }}
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
            onChange={(event) => {
              setEmail(event.target.value);
              setIsEmailError(false);
            }}
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
            {errorMessage}
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
              { 'is-danger': isCommentError },
            )}
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
              setIsCommentError(false);
            }}
          />
        </div>

        {isCommentError && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
