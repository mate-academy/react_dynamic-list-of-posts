import React, { useState } from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';
import { addComment } from '../api/comments';
import { FormInfo } from '../types/FormInfo';
import { FormErrors } from '../types/FormErrors';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post,
  handleFormVisibility: () => void,
  onAddComment: (comment: Comment) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  currentPost,
  onAddComment,
  handleFormVisibility,
}) => {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    email: false,
    body: false,
  });

  const [responseError, setResponseError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormChange = (field: string, value: string) => {
    setFormInfo((prevFormInfo) => ({ ...prevFormInfo, [field]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
  }

  const clearFormInfo = (form: FormInfo) => {
    const clearedForm: Record<string, string> = {};

    for (const field in form) {
      clearedForm[field] = '';
    }

    handleFormVisibility();
  };

  const handleFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()

    const fields = Object.keys(formInfo) as (keyof FormInfo)[];

    fields.forEach((field) => {
      if (formInfo[field].trim() === '') {
        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
      }
    });

    if (formInfo.name && formInfo.email && formInfo.body) {
      setIsLoading(true);

      addComment({
        postId: currentPost.id,
        name: formInfo.name,
        email: formInfo.name,
        body: formInfo.body,
      })
      .then((response) => {
        onAddComment(response);
      })
      .catch(() => {
        setResponseError(true);
      })
      .finally(() => {
        setIsLoading(false);
        clearFormInfo(formInfo);
      })
    }
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            className={cn('input', {
              'is-danger': formErrors.name,
            })}
            value={formInfo.name}
            onChange={(event) => {
              handleFormChange('name', event.target.value)
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
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
            className={cn('input', {
              'is-danger': formErrors.email,
            })}
            value={formInfo.email}
            onChange={(event) => {
              handleFormChange('email', event.target.value)
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={cn('textarea', {
              'is-danger': formErrors.body,
            })}
            value={formInfo.body}
            onChange={(event) => {
              handleFormChange('body', event.target.value)
            }}
          />
        </div>

        {formErrors.body && (
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
            onClick={() => {
              clearFormInfo(formInfo)
            }}
          >
            Clear
          </button>
        </div>

        {responseError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Unable to add comment, try again.
          </p>
        )}
      </div>
    </form>
  );
};
