import React, { useState } from 'react';
import cls from 'classnames';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post | null;
  onSubmitForm: (comment: CommentData, postId: number) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ post, onSubmitForm }) => {
  const [authorName, setAuthorName] = useState('');
  const [hasAuthorName, setHasAuthorName] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [hasAuthorEmail, setHasAuthorEmail] = useState(false);

  const [commentBody, setCommentBody] = useState('');
  const [hasCommentBody, setHasCommentBody] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasAuthorName(!authorName.trim());
    setHasAuthorEmail(!authorEmail.trim());
    setHasCommentBody(!commentBody.trim());

    if (!authorName.trim() || !authorEmail.trim() || !commentBody.trim()) {
      return;
    }

    const newComment: CommentData = {
      name: authorName,
      email: authorEmail,
      body: commentBody,
    };
    const postID = post ? post.id : 0;

    setIsSubmitting(true);

    onSubmitForm(newComment, postID)
      .then(() => {
        setCommentBody('');
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleAuthorNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthorName(event.target.value);
    setHasAuthorName(false);
  }

  function handleAuthorEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthorEmail(event.target.value);
    setHasAuthorEmail(false);
  }

  function handleCommentBodyChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setCommentBody(event.target.value);
    setHasCommentBody(false);
  }

  function resetForm() {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setHasAuthorName(false);
    setHasAuthorEmail(false);
    setHasCommentBody(false);
  }

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
            className={cls('input ', { 'is-danger': hasAuthorName })}
            value={authorName}
            onChange={handleAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorName && (
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
            className={cls('input ', { 'is-danger': hasAuthorEmail })}
            value={authorEmail}
            onChange={handleAuthorEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasAuthorEmail && (
            <span
              className={cls('icon is-small is-right has-text-danger', {
                'is-hidden': !hasAuthorEmail,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorEmail && (
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
            className={cls('textarea ', { 'is-danger': hasCommentBody })}
            value={commentBody}
            onChange={handleCommentBodyChange}
          />
        </div>

        {hasCommentBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cls('button is-link', { 'is-loading': isSubmitting })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
