import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
// eslint-disable-next-line import/no-cycle
import { addPostComment } from '../utils/api';

type Props = {
  postId: number,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export type NewComment = {
  postId: number,
  name: string,
  email: string,
  body: string,
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleClear = () => {
    setName('');
    setEmail('');
    setComment('');
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !comment.trim()) {
      if (!name.trim()) {
        setNameError(true);
      }

      if (!email.trim()) {
        setEmailError(true);
      }

      if (!comment.trim()) {
        setCommentError(true);
      }

      return;
    }

    const newComment: NewComment = {
      postId,
      name,
      email,
      body: comment,
    };

    addPostComment(newComment)
      .then((response: Comment) => {
        const added = { ...response };

        setComments(
          (prevComments: Comment[]) => [...prevComments, added] as Comment[],
        );

        setComment('');
      });
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
            className={cn({
              input: true,
              'is-danger': nameError,
            })}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
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
            className={cn({
              input: true,
              'is-danger': emailError,
            })}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
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
            className={cn({
              textarea: true,
              'is-danger': commentError,
            })}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setCommentError(false);
            }}
          />
        </div>

        {commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          {/* must have is-loading class when processing */}
          <button type="submit" className="button is-link">
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
