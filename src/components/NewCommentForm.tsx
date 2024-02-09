import classNames from 'classnames';
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import {
  comments,
  formErrors, inputBodyValue, inputEmailValue,
  inputNameValue, isCommentsErrorVisible, isFormLoaderVisible, selectedPost,
} from '../signals/signals';
import { postComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  useSignals();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;

    switch (inputName) {
      case 'name':
        inputNameValue.value = e.target.value;
        formErrors.value = { ...formErrors.value, name: false };
        break;

      case 'email':
        inputEmailValue.value = e.target.value;
        formErrors.value = { ...formErrors.value, email: false };
        break;

      default:
        break;
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputBodyValue.value = e.target.value;
    formErrors.value = { ...formErrors.value, body: false };
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputNameValue.value.trim()) {
      formErrors.value = { ...formErrors.value, name: true };
    }

    if (!inputEmailValue.value.trim()) {
      formErrors.value = { ...formErrors.value, email: true };
    }

    if (!inputBodyValue.value.trim()) {
      formErrors.value = { ...formErrors.value, body: true };
    }

    if (inputNameValue.value.trim()
      && inputEmailValue.value.trim()
      && inputBodyValue.value.trim()) {
      if (selectedPost.value) {
        const newComment = {
          postId: selectedPost.value.id,
          name: inputNameValue.value,
          email: inputEmailValue.value,
          body: inputBodyValue.value,
        };

        isFormLoaderVisible.value = true;
        isCommentsErrorVisible.value = false;
        postComment(newComment)
          .then((response) => {
            comments.value = [...comments.value, response];
            inputBodyValue.value = '';
          })
          .catch(() => {
            isCommentsErrorVisible.value = true;
          })
          .finally(() => {
            isFormLoaderVisible.value = false;
          });
      }
    }
  };

  const handleResetButton = () => {
    inputNameValue.value = '';
    inputEmailValue.value = '';
    inputBodyValue.value = '';
    formErrors.value = { name: false, email: false, body: false };
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleCommentSubmit}>
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
            value={inputNameValue.value}
            onInput={handleInput}
            className={classNames(
              'input',
              { 'is-danger': formErrors.value.name },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.value.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {formErrors.value.name && (
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
            value={inputEmailValue.value}
            onInput={handleInput}
            className={classNames(
              'input',
              { 'is-danger': formErrors.value.email },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.value.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {formErrors.value.email && (
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
            value={inputBodyValue.value}
            onInput={handleTextareaInput}
            className={classNames(
              'textarea',
              { 'is-danger': formErrors.value.body },
            )}
          />
        </div>

        {formErrors.value.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isFormLoaderVisible.value },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
