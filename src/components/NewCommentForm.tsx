import React, { SetStateAction, useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  setComments: React.Dispatch<SetStateAction<Comment[] | []>>;
}

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [hasName, setHasName] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasComment, setHasComment] = useState(false);

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [commentField, setCommentField] = useState('');

  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameField) {
      setHasName(true);
    }

    if (!emailField) {
      setHasEmail(true);
    }

    if (!commentField) {
      setHasComment(true);
    }

    if (nameField && emailField && commentField) {
      setIsLoadingNewComment(true);

      const newComment = {
        name: nameField,
        email: emailField,
        body: commentField,
        postId,
      };

      client
        .post<Comment>('/comments', newComment)
        .then(newCommentFromServer => {
          setComments(prev => [...prev, newCommentFromServer]);
        })
        .finally(() => {
          setIsLoadingNewComment(false);
          setCommentField('');
        });
    }
  };

  const handleClearClick = () => {
    setHasName(false);
    setHasEmail(false);
    setHasComment(false);

    setNameField('');
    setEmailField('');
    setCommentField('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameField(e.target.value);
    setHasName(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailField(e.target.value);
    setHasEmail(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentField(e.target.value);
    setHasComment(false);
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
            className={cn('input', {
              'is-danger': hasName,
            })}
            value={nameField}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasName && (
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
            className={cn('input', { 'is-danger': hasEmail })}
            value={emailField}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmail && (
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
            className={cn('textarea', { 'is-danger': hasComment })}
            value={commentField}
            onChange={handleCommentChange}
          />
        </div>

        {hasComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoadingNewComment,
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
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
