import classNames from 'classnames';
import React, { Dispatch, useContext, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { createComment } from '../../api/api';
import { StateContext } from '../../store/store';
import { Comment } from '../../types/Comment';

type Inputs = {
  name: string,
  email: string,
  body: string,
};

type Props = {
  setComments: Dispatch<React.SetStateAction<Comment[]>>
  setErrorMessage: Dispatch<React.SetStateAction<string>>
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  setComments,
  setErrorMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPost } = useContext(StateContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  function onSubmit(data: Inputs) {
    if (Object.keys(errors).length) {
      return;
    }

    const newComment: Comment = {
      ...data,
      postId: selectedPost?.id || 0,
      id: 0,
    };

    if (!newComment.body.trim().length) {
      return;
    }

    setIsLoading(true);
    createComment(newComment)
      .then(comment => {
        setComments(currentComments => [...currentComments, comment]);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
        reset({ body: '' });
      });
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            minLength={3}
            type="text"
            {...register('name', {
              required: 'Name is required',
            })}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errors.name?.message,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name?.message && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': errors.name?.message,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name?.message && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name?.message}
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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /.+@.+\..+/i,
                message: 'Enter correct Email',
              },

            })}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': errors.email?.message,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email?.message && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email?.message && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email?.message}
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
            {...register('body', {
              required: 'Enter some text',
            })}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': errors.body?.message,
            })}
          />
        </div>

        {errors.body?.message && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body?.message}
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
            disabled={!!Object.keys(errors).length}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => reset({ name: '', email: '', body: '' })}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
