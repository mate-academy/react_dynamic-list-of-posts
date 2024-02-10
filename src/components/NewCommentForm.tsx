import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { createComment } from '../api/comments';
import { AppContext } from './AppContext';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { selectedPost, setComments } = useContext(AppContext);

  const [authorName, setAuthorName] = useState('');
  const [errorAuthorName, setErrorAuthorName] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);

  const [commentsBody, setCommentsBody] = useState('');
  const [errorCommentsBody, setErrorCommentsBody] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAuthorName(event.target.value);
    setErrorAuthorName(false);
  };

  const handleInputEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);
    setErrorEmail(false);
  };

  const handleInputBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentsBody(event.target.value);
    setErrorCommentsBody(false);
  };

  const addComment = ({
    name, email: commentEmail, body, postId,
  }: Comment) => {
    return createComment({
      name,
      email: commentEmail,
      body,
      postId: postId ?? selectedPost?.id,
    })
      .then(newComment => setComments(currentComments => [
        ...currentComments, newComment,
      ]));
  };

  const reset = () => {
    setCommentsBody('');

    setErrorAuthorName(false);
    setErrorEmail(false);
    setErrorCommentsBody(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrorAuthorName(!authorName);
    setErrorEmail(!email);
    setErrorCommentsBody(commentsBody.trim() === '');

    if (!authorName || !email || !commentsBody.trim()) {
      return;
    }

    setIsSubmitting(true);

    addComment({
      name: authorName,
      email,
      body: commentsBody,
      postId: selectedPost?.id,
    })
      .then(reset)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={reset}
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
            className={cn('input', { 'is-danger': errorAuthorName })}
            value={authorName}
            onChange={handleInputAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errorAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthorName && (
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
            className={cn('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={handleInputEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={cn('textarea', { 'is-danger': errorCommentsBody })}
            value={commentsBody}
            onChange={handleInputBodyChange}
          />
        </div>

        {errorCommentsBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
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
