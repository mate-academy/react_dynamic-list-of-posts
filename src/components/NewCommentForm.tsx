import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../api/posts';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[] | null;
  post: Post;
  setComments: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  comments,
  post,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [nameMissingError, setNameMissingError] = useState(false);
  const [emailMissingError, setEmailMissingError] = useState(false);
  const [bodyMissingError, setBodyMissingError] = useState(false);
  const [loader, setLoader] = useState(false);

  function createCommentId() {
    if (comments) {
      const maxId = Math.max(...comments?.map(comment => comment.id));

      return maxId + 1;
    }

    return 1;
  }

  function createComment(): Comment {
    return {
      id: createCommentId(),
      postId: post.id,
      name: name,
      email: email,
      body: commentBody,
    };
  }

  function clearTheForm() {
    setName('');
    setEmail('');
    setCommentBody('');
    setNameMissingError(false);
    setBodyMissingError(false);
    setEmailMissingError(false);
  }

  function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newComment = createComment();
    let errorsHappened = false;

    if (!name.trim()) {
      setNameMissingError(true);
      errorsHappened = true;
    }

    if (!email.trim()) {
      setEmailMissingError(true);
      errorsHappened = true;
    }

    if (!commentBody.trim()) {
      setBodyMissingError(true);
      errorsHappened = true;
    }

    if (errorsHappened) {
      return;
    }

    setLoader(true);
    postComment(newComment)
      .then(res =>
        setComments((prevComments): Comment[] => [...prevComments, res]),
      )
      .finally(() => {
        setLoader(false);
        setCommentBody('');
      });
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={e => handleCommentSubmit(e)}>
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
            className={classNames('input', { 'is-danger': nameMissingError })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameMissingError(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameMissingError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {nameMissingError && (
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
            className={classNames('input', { 'is-danger': emailMissingError })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailMissingError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailMissingError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailMissingError && (
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
              'is-danger': bodyMissingError,
            })}
            value={commentBody}
            onChange={e => {
              setCommentBody(e.target.value);
              setBodyMissingError(false);
            }}
          />
        </div>

        {bodyMissingError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loader,
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
            onClick={clearTheForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
