import React, { useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../services/postComments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number;
  setPostComments: (comm: Comment[]) => void;
  postComments: Comment[];
  setErrorMessage: (err: string) => void;
};

export const NewCommentForm: React.FC<Props>
  = ({
    selectedPostId,
    setPostComments,
    postComments,
    setErrorMessage,
  }) => {
    const [name, setName] = useState('');
    const [hasNameError, setHasNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [hasEmailError, setHasEmailError] = useState(false);
    const [comment, setComment] = useState('');
    const [hasCommentError, setHasCommentError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
      setHasNameError(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setHasEmailError(false);
    };

    const handleCommentChange
      = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
        setHasCommentError(false);
      };

    function addComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    }: Comment) {
      setErrorMessage('');
      setLoading(true);

      createComment({
        postId,
        name: commentName,
        email: commentEmail,
        body,
      })
        .then(newComment => {
          setPostComments([...postComments, newComment]);
          setComment('');
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const handleAdd = (event: React.FormEvent) => {
      event.preventDefault();

      setHasNameError(!name);
      setHasEmailError(!email);
      setHasCommentError(!comment);

      if (!name || !email || !comment) {
        return;
      }

      addComment({
        id: postComments.length,
        postId: selectedPostId,
        name,
        email,
        body: comment,
      });
    };

    return (
      <form
        data-cy="NewCommentForm"
        onSubmit={handleAdd}
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
              className={classNames('input', {
                'is-danger': hasNameError,
              })}
              value={name}
              onChange={handleNameChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasNameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasNameError && (
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
                'is-danger': hasEmailError,
              })}
              value={email}
              onChange={handleEmailChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasEmailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasEmailError && (
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
              className={classNames('input', {
                'is-danger': hasCommentError,
              })}
              value={comment}
              onChange={handleCommentChange}
            />
          </div>

          {hasCommentError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={classNames('button is-link',
                { 'is-loading': loading })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="reset" className="button is-link is-light">
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  };
