// #region imports
import React, { memo, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { addPostComment } from '../services/comments';
import { Comment } from '../types/Comment';
import { ErrorNotification } from './ErrorNotification';
// #endregion

type Props = {
  postId: number;
  onCommentAdding: (comment: Comment) => void;
};

type FormData = {
  name: string;
  email: string;
  body: string;
};

export const NewCommentForm: React.FC<Props> = memo(function NewCommentForm({
  postId,
  onCommentAdding,
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingError, setIsAddingError] = useState(false);

  const onSubmit = handleSubmit(formData => {
    const newComment = {
      postId,
      ...formData,
    };

    setIsAddingError(false);
    setIsLoading(true);

    addPostComment(newComment)
      .then(addedComment => {
        onCommentAdding(addedComment);
        setValue('body', '');
      })
      .catch(() => setIsAddingError(true))
      .finally(() => setIsLoading(false));
  });

  const onReset = () => {
    setIsAddingError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onReset}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            placeholder="Name Surname"
            {...register('name', { required: true })}
            className={cn('input', {
              'is-danger': errors.name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            id="comment-author-email"
            placeholder="email@test.com"
            {...register('email', { required: true })}
            className={cn('input', {
              'is-danger': errors.email,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            placeholder="Type comment here"
            {...register('body', { required: true })}
            className={cn('textarea', {
              'is-danger': errors.body,
            })}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
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

      {isAddingError && (
        <ErrorNotification
          errorMessage="
              Unable to add a comment. Try again!
            "
        />
      )}
    </form>
  );
});
