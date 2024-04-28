import React, { ChangeEvent, useContext } from 'react';
import classNames from 'classnames';
import { NewCommentContext } from '../contexts/newCommentContext';
import { PostContext } from '../contexts/postContext';
import { addComment } from '../api/users';

export const NewCommentForm: React.FC = () => {
  const {
    formNameError,
    setFormNameError,
    formEmailError,
    setFormEmailError,
    formTextError,
    setFormTextError,
    loadingAddComment,
    setLoadingAddComment,
    nameValue,
    setNameValue,
    emailValue,
    setEmailValue,
    textValue,
    setTextValue,
  } = useContext(NewCommentContext);

  const {
    activePostId,
    postComments,
    setPostComments,
    setIsFormOpened,
    setIsErrorCommentsShown,
  } = useContext(PostContext);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
    setFormNameError(false);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    setFormEmailError(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
    setFormTextError(false);
  };

  const clearForm = () => {
    setNameValue('');
    setEmailValue('');
    setTextValue('');
    setFormNameError(false);
    setFormEmailError(false);
    setFormTextError(false);
  };

  const handleAddComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!nameValue.trim()) {
      setFormNameError(true);
    }

    if (!emailValue.trim()) {
      setFormEmailError(true);
    }

    if (!textValue.trim()) {
      setFormTextError(true);
    }

    const newComment = {
      name: nameValue.trim(),
      email: emailValue.trim(),
      body: textValue.trim(),
      postId: activePostId,
      id: +new Date(),
    };

    if (nameValue.trim() && emailValue.trim() && textValue.trim()) {
      setLoadingAddComment(true);

      addComment(newComment)
        .then(() => setPostComments([...postComments, newComment]))
        .catch(() => {
          setIsFormOpened(false);
          setIsErrorCommentsShown(true);
        })
        .finally(() => {
          setLoadingAddComment(false);
          setTextValue('');
        });
    }
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={nameValue}
            onChange={handleNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': formNameError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formNameError && (
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
            value={emailValue}
            onChange={handleEmailChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': formEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formEmailError && (
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
            value={textValue}
            onChange={handleTextChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': formTextError })}
          />
        </div>

        {formTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={handleAddComment}
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loadingAddComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={clearForm}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
