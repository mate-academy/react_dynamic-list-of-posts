import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Context } from '../context/Context';
import * as commentService from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const { selectedPost, setComments, setCommentError } = useContext(Context);

  const defaultState = { value: '', hasError: false };

  const [newCommentName, setNewCommentName] = useState(defaultState);
  const [newCommentEmail, setNewCommentEmail] = useState(defaultState);
  const [newCommentBody, setNewCommentBody] = useState(defaultState);
  const [isNewCommentFormLoading, setIsNewCommentFormLoading] = useState(false);

  const reset = () => {
    setNewCommentName(prevName => ({ ...prevName, hasError: false }));
    setNewCommentEmail(prevEmail => ({ ...prevEmail, hasError: false }));
    setNewCommentBody(prevBody => ({ ...prevBody, value: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsNewCommentFormLoading(true);

    if (!newCommentName.value.trim()) {
      setNewCommentName(prevName => ({ ...prevName, hasError: true }));
    }

    if (!newCommentEmail.value.trim()) {
      setNewCommentEmail(prevEmail => ({ ...prevEmail, hasError: true }));
    }

    if (!newCommentBody.value.trim()) {
      setNewCommentBody(prevBody => ({ ...prevBody, hasError: true }));
    }

    if (
      !newCommentName.value.trim() ||
      !newCommentEmail.value.trim() ||
      !newCommentBody.value.trim()
    ) {
      setIsNewCommentFormLoading(false);

      return;
    }

    const newComment = {
      postId: selectedPost?.id,
      name: newCommentName.value.trim(),
      email: newCommentEmail.value.trim(),
      body: newCommentBody.value.trim(),
    };

    commentService
      .addComment(newComment)
      .then(result => {
        setComments(currentComments => [...currentComments, result]);
        reset();
      })
      .catch(() => {
        setCommentError('Failed to load comments');
      })
      .finally(() => setIsNewCommentFormLoading(false));
  };

  const handleClearForm = () => {
    setNewCommentName({ value: '', hasError: false });
    setNewCommentEmail({ value: '', hasError: false });
    setNewCommentBody({ value: '', hasError: false });
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
            className={cn('input', { 'is-danger': newCommentName.hasError })}
            value={newCommentName.value}
            onChange={e =>
              setNewCommentName({ value: e.target.value, hasError: false })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!newCommentName.hasError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            className={cn('input', {
              'is-danger': newCommentEmail.hasError,
            })}
            value={newCommentEmail.value}
            onChange={e =>
              setNewCommentEmail({ value: e.target.value, hasError: false })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!newCommentEmail.hasError && (
            <>
              <span
                className={'icon is-small is-right is- has-text-danger'}
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            className={cn('textarea', {
              'is-danger': newCommentBody.hasError,
            })}
            value={newCommentBody.value}
            onChange={e =>
              setNewCommentBody({ value: e.target.value, hasError: false })
            }
          />
        </div>

        {!!newCommentBody.hasError && (
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
              'is-loading': isNewCommentFormLoading,
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
