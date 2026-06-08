import React from 'react';
import { Comment } from '../types/Comment';
import cn from 'classnames';
import { LoadingState } from '../types/Loading';
import { FormErrors } from '../types/Errors';

type Props = {
  isLoading: LoadingState;
  newComment: Comment | null;
  onAddComment: (comment: Comment) => void;
  formErrors: FormErrors;
  onErrorChange: (field: keyof FormErrors, value: boolean) => void;
  onNewCommentSubmit: (newComment: Comment) => void;
  onClearForm: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  isLoading,
  newComment,
  onAddComment,
  formErrors,
  onErrorChange,
  onNewCommentSubmit,
  onClearForm,
}) => {
  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => {
        e.preventDefault();
        onNewCommentSubmit(newComment as Comment);
      }}
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
            className={cn('input', { 'is-danger': formErrors.name })}
            value={newComment?.name || ''}
            onChange={e => {
              onAddComment({ ...newComment, name: e.target.value } as Comment);
              onErrorChange('name', false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            className={cn('input', { 'is-danger': formErrors.email })}
            value={newComment?.email || ''}
            onChange={e => {
              onAddComment({ ...newComment, email: e.target.value } as Comment);
              onErrorChange('email', false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            className={cn('textarea', { 'is-danger': formErrors.body })}
            value={newComment?.body || ''}
            onChange={e => {
              onAddComment({ ...newComment, body: e.target.value } as Comment);
              onErrorChange('body', false);
            }}
          />
        </div>

        {formErrors.body && (
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
              'is-loading': isLoading.newComment,
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
            onClick={onClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
