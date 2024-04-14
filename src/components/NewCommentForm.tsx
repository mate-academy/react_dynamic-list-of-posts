import React, { useContext, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { StateContext } from '../store/store';
import { postComment } from '../api/fetches';
import classNames from 'classnames';
type Props = {
  onAddComment: (newComment: Comment) => void;
};
export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const { currentPost } = useContext(StateContext);

  const formFields: CommentData = {
    name: '',
    email: '',
    body: '',
  };

  const [commentFields, setCommentFields] = useState<CommentData>(formFields);

  const [isError, setIsError] = useState<boolean>(false);

  const [sendForm, setSendForm] = useState<boolean>(false);

  const [sendFormError, setSendFormError] = useState<boolean>(false);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentFields(previousFields => ({
      ...previousFields,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClearFields = () => {
    setCommentFields(formFields);
    setIsError(false);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    for (const value of Object.values(commentFields)) {
      if (!value.trim().length) {
        setIsError(true);

        return;
      }

      setIsError(false);
    }

    setIsError(false);

    const obj = {
      postId: currentPost?.id,
      ...commentFields,
    } as Comment;

    setSendForm(true);

    postComment(obj)
      .then(comment => {
        setSendFormError(false);
        onAddComment(comment);
        setCommentFields(prevCommentBody => ({
          ...prevCommentBody,
          body: '',
        }));
      })
      .catch(() => setSendFormError(true))
      .finally(() => setSendForm(false));
  };

  return (
    <>
      {sendFormError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="name"
              value={commentFields.name}
              onChange={handleInput}
              id="comment-author-name"
              placeholder="Name Surname"
              className={classNames('input', {
                'is-danger': isError && !commentFields.name.length,
              })}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {isError && !commentFields.name.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {isError && !commentFields.name.length && (
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
              value={commentFields.email}
              onChange={handleInput}
              id="comment-author-email"
              placeholder="email@test.com"
              className={classNames('input', {
                'is-danger': isError && !commentFields.email.length,
              })}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            {isError && !commentFields.email.length && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>
          {isError && !commentFields.email.length && (
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
              onChange={handleInput}
              value={commentFields.body}
              placeholder="Type comment here"
              className={classNames('textarea', {
                'is-danger': isError && !commentFields.body.length,
              })}
            />
          </div>
          {isError && !commentFields.body.length && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={classNames('button', 'is-link', {
                'is-loading': sendForm,
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
              onClick={handleClearFields}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
