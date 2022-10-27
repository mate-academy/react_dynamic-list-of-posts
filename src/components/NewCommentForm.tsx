import React, { useState } from 'react';
import classNames from 'classnames';
import { addNewComment } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  setComments: (newComments: (prev: Comment[]) => Comment[]) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
}) => {
  const [commentName, setCommentName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const resetForm = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
  };

  const validate = () => {
    if (!commentName || !commentEmail || !commentBody) {
      setIsError(true);

      return false;
    }

    return true;
  };

  const onAddComment = async () => {
    if (!validate()) {
      return;
    }

    setIsAdding(true);
    setIsError(false);

    try {
      const newComment = {
        postId,
        name: commentName,
        email: commentEmail,
        body: commentBody,
      };

      const result: Comment = await addNewComment(newComment);

      setComments((prevState: Comment[]) => (
        [...prevState, result]
      ));
    } catch (e) {
      setIsError(true);
    }

    setCommentBody('');
    setIsAdding(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        onAddComment();
      }}
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
              'is-danger': isError && !commentName,
            })}
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError && !commentName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError && !commentName && (
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isError && !commentEmail,
            })}
            value={commentEmail}
            onChange={(e) => setCommentEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {isError && !commentEmail && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>

        </div>

        {isError && !commentEmail && (
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
              'is-danger': isError && !commentBody,
            })}
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </div>

        {isError && !commentBody && (
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
              'is-loading': isAdding,
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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
