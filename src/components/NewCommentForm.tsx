import cn from 'classnames';
import React from 'react';

interface NewCommentFormProps {
  onChangeCommentAuthorName:
  (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCommentAuthorEmail:
  (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCommentContent:
  (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentAuthorName: string;
  commentAuthorEmail: string;
  commentContent: string;
  onClearCommentForm: () => void;
  onCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  hasFormError: boolean;
  isAddingComment: boolean;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = React.memo(({
  onChangeCommentAuthorName,
  onChangeCommentAuthorEmail,
  onChangeCommentContent,
  commentAuthorName,
  commentAuthorEmail,
  commentContent,
  onClearCommentForm,
  onCommentSubmit,
  hasFormError,
  isAddingComment,
}) => {
  const nameHasError = hasFormError
   && !commentAuthorName;
  const emailHasError = hasFormError
   && !commentAuthorEmail;
  const contentAreaHasError = hasFormError
   && !commentContent;

  return (
    <form data-cy="NewCommentForm" onSubmit={onCommentSubmit}>
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
            className={cn('input', {
              'is-danger': nameHasError,
            })}
            value={commentAuthorName}
            onChange={onChangeCommentAuthorName}
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
        ) }
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
            className={cn('input', {
              'is-danger': emailHasError,
            })}
            value={commentAuthorEmail}
            onChange={onChangeCommentAuthorEmail}
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
          ) }
        </div>

        {emailHasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        ) }
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
            className={cn('textarea', {
              'is-danger': contentAreaHasError,
            })}
            value={commentContent}
            onChange={onChangeCommentContent}
          />
        </div>

        {contentAreaHasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        ) }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isAddingComment,
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
            onClick={() => onClearCommentForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
