import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { CommentData } from '../../types/Comment';
import {
  DispatchContext,
  StateContext,
} from '../../reducer/store';
import { commentService } from '../../services/comment.service';

type Props = {
  postId: number
};

export const NewCommentForm: React.FC<Props> = React.memo(({ postId }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  const { commentsList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const {
    register,
    formState: { errors },
    reset,
    resetField,
    handleSubmit,
  } = useForm<CommentData>();

  const onSubmit = (data: CommentData) => {
    const { addNewComment } = commentService(dispatch, commentsList);

    setShowSpinner(true);

    const dataToSend = {
      name: data.name.trim(),
      email: data.email.trim(),
      body: data.body.trim(),
      postId,
    };

    addNewComment(dataToSend, setShowSpinner, resetField);
  };

  const onClearFormHandler = useCallback(() => reset(), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            {...register('name', { required: true })}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
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
            {...register('email', { required: true })}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
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
            {...register('body', { required: true })}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
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
            className={
              classNames(
                'button is-link',
                { 'is-loading': showSpinner },
              )
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={onClearFormHandler}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
