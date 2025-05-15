import React from 'react';

type Props = {
  inputTitleValue: string;
  inputEmailValue: string;
  bodyComment: string;
  isLoadingAddComment: boolean;
  titleError: boolean;
  emailError: boolean;
  bodyCommentError: boolean;
  handleTitleComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBodyComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitAddCommentToPost: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClearButton: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  inputTitleValue,
  inputEmailValue,
  bodyComment,
  isLoadingAddComment,
  titleError,
  emailError,
  bodyCommentError,
  handleTitleComment,
  handleEmailComment,
  handleBodyComment,
  handleSubmitAddCommentToPost,
  handleClearButton,
}) => {
  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitAddCommentToPost}>
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
            className={`input ${titleError && 'is-danger'}`}
            value={inputTitleValue}
            onChange={handleTitleComment}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {titleError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {titleError && (
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
            className={`input ${emailError && 'is-danger'}`}
            value={inputEmailValue}
            onChange={handleEmailComment}
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
            className={`textarea ${bodyCommentError && 'is-danger'}`}
            value={bodyComment}
            onChange={handleBodyComment}
          />
        </div>
        {bodyCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoadingAddComment && 'is-loading'}`}
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
