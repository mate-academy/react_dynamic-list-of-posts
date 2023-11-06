import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../api/comments';

type Props = {
  postId: number;
  onCommentAdd: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdd }) => {
  const [author, setAuthor] = useState('');
  const [authorError, setAuthorError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleReset = () => {
    setAuthor('');
    setAuthorError(false);
    setEmail('');
    setEmailError(false);
    setCommentBody('');
    setCommentError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCommentLoading(true);

    if (author.trim() === '') {
      setAuthorError(true);
      setCommentLoading(false);
    }

    if (email.trim() === '') {
      setEmailError(true);
      setCommentLoading(false);
    }

    if (commentBody.trim() === '') {
      setCommentError(true);
      setCommentLoading(false);
    }

    if (author && email && commentBody) {
      const newComment: Omit<Comment, 'id'> = {
        postId,
        name: author,
        email,
        body: commentBody,
      };

      addComment(newComment)
        .then(addedComment => {
          onCommentAdd(currComments => (
            [...currComments, addedComment] as Comment[]));
          setCommentBody('');
        })
        // .catch(() => setCommentLoading(false))
        .finally(() => {
          setCommentLoading(false);
          setCommentError(false);
        });
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
            className={cn('input', { 'is-danger': authorError && !author })}
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorError && !author
            ? (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
            : null}
        </div>

        {authorError && !author
          ? (
            <p className="help is-danger" data-cy="ErrorMessage">
              Name is required
            </p>
          )
          : null}
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
            className={cn('input', { 'is-danger': emailError && !email })}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && !email ? (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          ) : null}
        </div>

        {emailError && !email ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        ) : null}
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
              { 'is-danger': commentError && !commentBody })}
            value={commentBody}
            onChange={event => setCommentBody(event.target.value)}
          />
        </div>

        {commentError && !commentBody ? (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) : null}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': commentLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
