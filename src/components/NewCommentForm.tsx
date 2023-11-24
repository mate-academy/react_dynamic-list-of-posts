import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../utils/posts';
import { PostContext } from '../PostsProvider';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPost,
    setCurrentComments,
    currentComments,
    setError,
  } = useContext(PostContext);

  const [newComment, setNewComment] = useState<Omit<Comment, 'id' | 'postId'>>({
    name: '',
    email: '',
    body: '',
  });

  const [formError, setFormError] = useState({
    nameError: '',
    emailError: '',
    bodyError: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.name === '') {
      setFormError({
        ...formError,
        nameError: 'Name is required',
      });

      return;
    }

    if (newComment.email === '') {
      setFormError({
        ...formError,
        emailError: 'Email is required',
      });

      return;
    }

    if (newComment.body === '') {
      setFormError({
        ...formError,
        bodyError: 'Enter some text',
      });

      return;
    }

    if (selectedPost) {
      setIsLoading(true);
      addComment({
        name: newComment.name,
        email: newComment.email,
        body: newComment.body,
        postId: selectedPost?.id,
      })
        .then((data) => {
          setCurrentComments([...currentComments, data]);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
          setNewComment({
            name: '',
            email: '',
            body: '',
          });
        });
    }
  };

  const onClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setNewComment({
      ...newComment,
      body: '',
    });
    setFormError({
      nameError: '',
      emailError: '',
      bodyError: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewComment({
      ...newComment,
      [name]: value,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
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
            className={cn('input', { 'is-danger': formError.nameError })}
            value={newComment.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formError.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formError.nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formError.nameError}
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
            className={cn('input', { 'is-danger': formError.emailError })}
            value={newComment.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formError.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formError.emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formError.emailError}
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
            className={cn('textarea',
              { 'is-danger': formError.bodyError })}
            value={newComment.body}
            onChange={handleTextAreaChange}
          />
        </div>

        {formError.bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formError.bodyError}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
