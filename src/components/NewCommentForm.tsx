import classNames from "classnames";
import { CommentData } from "../types/Comment";
import React, { useContext } from "react";
import { FormNotification } from "../enums/FormNotification";
import { CommentContext } from "../App";

export const NewCommentForm: React.FC = () => {
  const { comment, dispatch, onAddComment } = useContext(CommentContext);

  function handleClear() {
    dispatch({ type: "clear" });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: "error_reset" });

    const trimmedName = comment.name.trim();
    const trimmedEmail = comment.email.trim();
    const trimmedBody = comment.body.trim();

    let isValidForm = true;

    if (!trimmedName) {
      dispatch({ type: "empty_name" });

      isValidForm = false;
    }

    if (!trimmedEmail) {
      dispatch({ type: "empty_email" });

      isValidForm = false;
    }

    if (!trimmedBody) {
      dispatch({ type: "empty_body" });

      isValidForm = false;
    }

    if (!isValidForm) {
      return;
    }

    const newComment: CommentData = {
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
    };

    dispatch({ type: "isLoading", loading: true });

    onAddComment(newComment)
      .then(() => dispatch({ type: "comment_added" }))
      .finally(() => dispatch({ type: "isLoading", loading: false }));
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={(e) => handleSubmit(e)}>
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
            value={comment.name}
            className={classNames("input", { "is-danger": comment.errorName })}
            onChange={(e) =>
              dispatch({ type: "changed_name", name: e.target.value })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {comment.errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {comment.errorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {FormNotification.RequiredName}
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
            value={comment.email}
            className={classNames("input", { "is-danger": comment.errorEmail })}
            onChange={(e) =>
              dispatch({ type: "changed_email", email: e.target.value })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {comment.errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {comment.errorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {FormNotification.RequiredEmail}
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
            value={comment.body}
            className={classNames("textarea", {
              "is-danger": comment.errorBody,
            })}
            onChange={(e) =>
              dispatch({ type: "changed_body", body: e.target.value })
            }
          />
        </div>

        {comment.errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {FormNotification.RequiredText}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames("button is-link", {
              "is-loading": comment.loading,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
