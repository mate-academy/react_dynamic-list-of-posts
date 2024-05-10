import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { postComment } from '../api/client';
import { Comment } from '../types/Comment';
import { PostsContext } from '../postsContext';

export const NewCommentForm: React.FC = () => {
  const { comments, selectedPost, setComments } = useContext(PostsContext);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loadingNewComment, setLoadingNewComment] = useState(false);

  const postNewComment = (newComment: Comment) => {
    setLoadingNewComment(true);
    postComment(newComment)
      .then(response => setComments([...comments, response]))
      .finally(() => {
        setLoadingNewComment(false);
        setComment('');
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let error = false;

    if (name.trim() === '') {
      setNameError(true);
      error = true;
    }

    if (!comment.trim()) {
      setCommentError(true);
      error = true;
    }

    if (!email.trim()) {
      setEmailError(true);
      error = true;
    }

    if (!error) {
      const newComment = {
        id: 0,
        postId: selectedPost ? selectedPost.id : 0,
        name: name,
        email: email,
        body: comment,
      };

      postNewComment(newComment);
    }
  };

  const handleClearButton = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setComment('');
    setCommentError(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setCommentError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={e => handleSubmit(e)}>
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
            className={cn('input', { 'is-danger': nameError })}
            value={name}
            onChange={event => handleChangeName(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={event => handleChangeEmail(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            className={cn('textarea', { 'is-danger': commentError })}
            value={comment}
            onChange={event => handleChangeComment(event)}
          />
        </div>

        {commentError && (
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
              'is-loading': loadingNewComment,
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
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
