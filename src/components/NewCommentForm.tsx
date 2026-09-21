import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/comment';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addNewComment: (data: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCommentText, setErrorCommentText] = useState(false);

  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const commentFieldsReset = () => {
    setAuthorName('');
    setEmail('');
    setCommentText('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorCommentText(false);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    let emptySubmitField = false;

    if (authorName === '') {
      setErrorName(true);
      emptySubmitField = true;
    }

    if (email === '') {
      setErrorEmail(true);
      emptySubmitField = true;
    }

    if (commentText === '') {
      setErrorCommentText(true);
      emptySubmitField = true;
    }

    if (emptySubmitField) {
      return;
    }

    setNewCommentLoading(true);

    const newCommentData: Omit<Comment, 'id'> = {
      postId: postId,
      name: authorName,
      email: email,
      body: commentText,
    };

    addComment(newCommentData)
      .then(data => {
        addNewComment(data as Comment);
        setCommentText('');
      })
      .finally(() => setNewCommentLoading(false));
  };

  const onAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);

    if (errorName && event.target.value !== '') {
      setErrorName(false);
    }
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (errorEmail && event.target.value !== '') {
      setErrorEmail(false);
    }
  };

  const onCommentTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);

    if (errorCommentText && event.target.value !== '') {
      setErrorCommentText(false);
    }
  };

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
            className={cn('input', { 'is-danger': errorName })}
            value={authorName}
            onChange={onAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            className={cn('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={onEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={cn('textarea', { 'is-danger': errorCommentText })}
            value={commentText}
            onChange={onCommentTextChange}
          />
        </div>

        {errorCommentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': newCommentLoading,
            })}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={commentFieldsReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
// React.MouseEvent<HTMLButtonElement, MouseEvent>
