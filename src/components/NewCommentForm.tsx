/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  setIsError: (isError: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  setIsError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentBodyError, setCommentBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNameError(!name);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailError(!regex.test(email));
    setCommentBodyError(!commentBody);

    if (!name || !email || !commentBody) {
      return;
    }

    setIsLoading(true);
    let hasError = false;

    client
      .post<Comment>('/comments', {
        postId: selectedPost.id,
        name,
        email,
        body: commentBody,
      })
      .then(newComment => {
        setComments([...comments, newComment]);
        setCommentBody('');
      })
      .catch(() => {
        hasError = true;
      })
      .finally(() => {
        setIsLoading(false);
        setIsError(hasError);
      });
  };

  const handleClearButton = () => {
    setName('');
    setEmail('');
    setCommentBody('');
    setNameError(false);
    setEmailError(false);
    setCommentBodyError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': nameError,
            })}
            value={name}
            onChange={event => {
              setName(event.target.value);
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
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
            className={classNames('textarea', {
              'is-danger': commentBodyError,
            })}
            value={commentBody}
            onChange={event => {
              setCommentBody(event.target.value);
              setCommentBodyError(false);
            }}
          />
        </div>

        {commentBodyError && (
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
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
