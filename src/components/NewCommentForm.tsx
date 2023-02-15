import cn from 'classnames';
import React, { useState } from 'react';

import { postComments } from '../api/apiActions';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null,
  extendComments: (commentToPost: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  extendComments,
}) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [authorsName, setAuthorsName] = useState('');
  const [authorsEmail, setAuthorsEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasErrorOnSubmit, setHasErrorOnSubmit] = useState(false);

  const hasNameError = !authorsName.length && hasErrorOnSubmit;
  const hasEmailError = !authorsEmail.length && hasErrorOnSubmit;
  const hasCommentError = !commentText.length && hasErrorOnSubmit;

  const hasFormError = !authorsName.length
    || !authorsEmail.length
    || !commentText.length;

  const clearForm = () => {
    setAuthorsName('');
    setAuthorsEmail('');
    setCommentText('');
    setHasErrorOnSubmit(false);
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasFormError && selectedPost) {
      setIsFormSubmitting(true);

      const commentToPost: Comment = {
        id: 0,
        postId: selectedPost.id,
        name: authorsName,
        email: authorsEmail,
        body: commentText,
      };

      postComments(commentToPost)
        .then(() => {
          extendComments(commentToPost);
          setCommentText('');
        })
        .finally(() => {
          setIsFormSubmitting(false);
        });
    } else if (hasFormError) {
      setHasErrorOnSubmit(true);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => submitForm(event)}
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
            className={cn(
              'input',
              { 'is-danger': hasNameError },
            )}
            value={authorsName}
            onChange={(event) => setAuthorsName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && hasErrorOnSubmit && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {hasNameError && hasErrorOnSubmit && (
          <p
            className={cn(
              'help',
              { 'is-danger': hasNameError },
            )}
            data-cy="ErrorMessage"
          >
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
            value={authorsEmail}
            className={cn(
              'input',
              { 'is-danger': hasEmailError },
            )}
            onChange={(event) => setAuthorsEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {hasEmailError && hasErrorOnSubmit && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasEmailError && hasErrorOnSubmit && (
          <p
            className={cn(
              'help',
              { 'is-danger': hasEmailError },
            )}
            data-cy="ErrorMessage"
          >
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
            value={commentText}
            className={cn(
              'input',
              { 'is-danger': hasCommentError },
            )}
            onChange={(event) => setCommentText(event.target.value)}
          />
        </div>
        {hasCommentError && hasErrorOnSubmit && (
          <p
            className={cn(
              'help',
              { 'is-danger': hasCommentError },
            )}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button is-link',
              { 'is-loading': isFormSubmitting },
            )}
          >
            Add
          </button>
        </div>
        {!isFormSubmitting && (
          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              type="reset"
              className="button is-link is-light"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </form>
  );
};
