import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import cn from 'classnames';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setCommentsError: (commentsError: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setCommentsError,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isError = !name.trim() || !email.trim() || !body.trim();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyError(false);
    setBody(event.target.value);
  };

  const fieldsValidation = () => {
    if (!name.trim()) {
      setNameError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!body.trim()) {
      setBodyError(true);
    }
  };

  const addNewComment = () => {
    setIsLoading(true);

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    createComment(newComment)
      .then(responseComment =>
        setComments(prevComments => [
          ...prevComments,
          responseComment as Comment,
        ]),
      )
      .catch(() => setCommentsError(true))
      .finally(() => {
        setIsLoading(false);
        setBody('');
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fieldsValidation();

    if (isError) {
      return;
    }

    addNewComment();
  };

  const handleClearFields = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
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
            className={cn('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleNameChange}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
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
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={event => handleBodyChange(event)}
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
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => handleClearFields()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
