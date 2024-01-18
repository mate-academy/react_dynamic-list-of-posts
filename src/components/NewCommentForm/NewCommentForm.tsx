import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { addComment } from '../../api/comments';

import { DispatchContext, StateContext } from '../../Store';
import { Error } from '../../types/Error';

type Inputs = {
  name: string;
  email: string;
  body: string;
};

export const NewCommentForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { selectedPost } = useContext(StateContext);
  const postId = selectedPost?.id || 0;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  });

  const handleAddCommentError = () => {
    dispatch({ type: 'setError', payload: Error.AddComment });
    setTimeout(() => {
      dispatch({ type: 'setError', payload: '' });
    }, 3000);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, body } = data;

    try {
      const commentToAdd = await addComment({
        postId,
        name,
        email,
        body,
      });

      dispatch({ type: 'addComment', payload: commentToAdd });
      reset({ body: '' });
    } catch (error) {
      handleAddCommentError();
    }
  };

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
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            type="text"
            name="name"
            value={watch('name')}
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
              required: {
                value: true,
                message: 'Email is required',
              },
            })}
            type="text"
            name="email"
            value={watch('email')}
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
            {...register('body', {
              required: {
                value: true,
                message: 'Enter some text',
              },
            })}
            name="body"
            value={watch('body')}
            id="comment-body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isSubmitting },
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
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
