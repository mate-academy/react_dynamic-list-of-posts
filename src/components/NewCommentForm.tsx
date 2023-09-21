import React, { useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../api/comments';
import { Post } from '../types/Post';
import { useComments } from './Contexts/CommentsContext';

type Props = {
  selectedPost: Post,
};

const initialCommentForm = {
  name: '',
  email: '',
  commentText: '',
};

export const NewCommentForm: React.FC<Props> = ({ selectedPost }) => {
  const { setComments } = useComments();

  const [commentForm, setCommentForm] = useState(initialCommentForm);
  const { name, email, commentText } = commentForm;

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (name && email && commentText) {
      setIsLoading(true);
      const newComment = await createComment({
        name,
        email,
        body: commentText,
        postId: selectedPost.id,
      });

      try {
        setComments(prev => [...prev, newComment]);
      } catch {
        // eslint-disable-next-line no-console
        console.info('Something went wrong.');
      }

      setCommentForm(prev => ({ ...prev, commentText: '' }));
      setIsSubmitted(false);
      setIsLoading(false);
    }
  };

  const onClear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCommentForm(initialCommentForm);
    setIsSubmitted(false);
  };

  const commentHasError = !commentText && isSubmitted;
  const emailHasError = !email && isSubmitted;
  const nameHasError = !name && isSubmitted;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm(prev => ({ ...prev, name: event.target.value }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm(prev => ({ ...prev, email: event.target.value }));
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentForm(prev => ({ ...prev, commentText: event.target.value }));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
      onReset={onClear}
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
            className={classNames('input', { 'is-danger': nameHasError })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {nameHasError && (
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
            className={classNames('input', { 'is-danger': emailHasError })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {emailHasError && (
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
            className={classNames('textarea', { 'is-danger': commentHasError })}
            value={commentText}
            onChange={handleChangeComment}
          />
        </div>
        {commentHasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoading })}
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
    </form>
  );
};
