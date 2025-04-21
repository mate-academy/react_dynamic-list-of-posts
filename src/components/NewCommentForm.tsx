import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Comment } from '../types/Comment';

interface Props {
  selectedPostId: number;
  loading: boolean;
  handleAdd: (newData: Comment) => Promise<void>;
}
type FormData = {
  name: string;
  email: string;
  body: string;
};

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ selectedPostId, handleAdd, loading }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>();

    const onSubmit = useCallback(
      (data: FormData) => {
        const newData: Comment = {
          id: 0,
          name: data.name,
          email: data.email,
          body: data.body,
          postId: selectedPostId,
        };

        handleAdd(newData).then(() => {
          reset({ name: data.name, email: data.email, body: '' });
        });
      },
      [selectedPostId, handleAdd, reset],
    );

    return (
      <form data-cy="NewCommentForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              name="name"
              id="comment-author-name"
              placeholder="Name Surname"
              className={cn('input', { 'is-danger': errors.name })}
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
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="field" data-cy="EmailField">
          <label className="label" htmlFor="comment-author-email">
            Author Email
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email',
                },
              })}
              type="text"
              name="email"
              id="comment-author-email"
              placeholder="email@test.com"
              className={cn('input', { 'is-danger': errors.email })}
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
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="field" data-cy="BodyField">
          <label className="label" htmlFor="comment-body">
            Comment Text
          </label>

          <div className="control">
            <textarea
              {...register('body', { required: 'Enter some text' })}
              id="comment-body"
              name="body"
              placeholder="Type comment here"
              className={cn('textarea', { 'is-danger': errors.body })}
            />
          </div>

          {errors.body && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.body.message}
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': loading })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type="reset"
              className="button is-link is-light"
              onClick={() => reset()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  },
);

NewCommentForm.displayName = 'NewCommentForm';
