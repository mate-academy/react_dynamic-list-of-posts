import React, { useState } from 'react';
import { useAppContext } from '../context/store';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { FormError } from './FormError';

export const NewCommentForm: React.FC = () => {
  const {
    state: { selectedPost },
    methods: { addComment },
  } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const initialData = {
    name: '',
    email: '',
    body: '',
  };
  const [newComment, setNewComment] = useState<CommentData>(initialData);
  const [formError, setFormError] = useState<CommentData>(initialData);

  const reset = () => {
    setNewComment(initialData);
    setFormError(initialData);
  };

  function validateInput(name: keyof CommentData, value: string) {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required!';
      case 'email':
        return value.trim() ? '' : 'Email is required!';
      case 'body':
        return value.trim() ? '' : 'Enter some text!';
      default:
        return '';
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNewComment(prev => ({ ...prev, [name]: value }));
    setFormError(prev => ({
      ...prev,
      [name]: validateInput(name as keyof CommentData, value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const currentPost = selectedPost as Post;

    const errors = Object.keys(newComment).reduce((acc, key) => {
      const error = validateInput(
        key as keyof CommentData,
        newComment[key as keyof CommentData],
      );

      return error ? { ...acc, [key]: error } : acc;
    }, {} as CommentData);

    if (!Object.keys(errors).length) {
      setIsSubmitting(true);
      const commentToAdd: Omit<Comment, 'id'> = {
        postId: currentPost.id,
        ...newComment,
      };

      addComment(commentToAdd)
        .then(() => setNewComment(prev => ({ ...prev, body: '' })))
        .finally(() => setIsSubmitting(false));
    } else {
      setFormError(errors);
    }
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
            className={classNames('input', {
              'is-danger': formError.name,
            })}
            value={newComment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formError.name && <FormError message={formError.name} />}
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
              'is-danger': formError.email,
            })}
            value={newComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formError.email && <FormError message={formError.email} />}
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
              'is-danger': formError.body,
            })}
            value={newComment.body}
            onChange={handleChange}
          />
        </div>

        {formError.body && <FormError message={formError.body} />}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
