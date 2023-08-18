import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  addComments:(addingComment: Omit<Comment, 'id'>) => void
  selectPost: Post | null
  isLoading: boolean
};

export const NewCommentForm: React.FC<Props> = ({
  addComments,
  selectPost,
  isLoading,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!authorName) {
      hasError = true;
      setNameError(true);
    }

    if (!authorEmail) {
      hasError = true;
      setEmailError(true);
    }

    if (!authorText) {
      hasError = true;
      setTextError(true);
    }

    if (hasError) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId: selectPost?.id || 0,
      name: authorName,
      email: authorEmail,
      body: authorText,
    };

    addComments(newComment);
    setAuthorName(newComment.name);
    setAuthorEmail(newComment.email);
    setAuthorText('');
    setTextError(false);
  };

  const handlerClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setAuthorText('');
    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  const errorIcon = (
    <span
      className="icon is-small is-right has-text-danger"
      data-cy="ErrorIcon"
    >
      <i className="fas fa-exclamation-triangle" />
    </span>
  );

  return (
    <form data-cy="NewCommentForm">
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
            className={cn('input',
              { 'is-danger': nameError && !authorName.trim() })}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && !authorName.trim() && errorIcon}
        </div>
        {nameError && !authorName.trim() && (
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
            className={cn('input',
              { 'is-danger': emailError && !authorEmail.trim() })}
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && !authorEmail.trim() && errorIcon}
        </div>

        {emailError && !authorEmail.trim() && (
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
            id={authorText}
            name="body"
            placeholder="Type comment here"
            className={cn('textarea',
              { 'is-danger': textError && !authorText.trim() })}
            value={authorText}
            onChange={(e) => setAuthorText(e.target.value)}
          />
        </div>

        {textError && !authorText.trim() && (
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
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handlerClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
