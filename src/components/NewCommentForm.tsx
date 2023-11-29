import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from './GeneralContext';
import * as commentsService from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    comments,
    selectedPost,
    setComments,
  } = useContext(GlobalContext);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const [isFormSending, setIsFormSending] = useState(false);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMessageValid, setIsMessageValid] = useState(true);

  const handleSetNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
    setIsNameValid(true);
  };

  const handleSetNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
    setIsEmailValid(true);
  };

  const handleSetNewMessage
  = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
    setIsMessageValid(true);
  };

  const formValidate = () => {
    let isFormValid = true;

    if (!newName.trim()) {
      setIsNameValid(false);
      isFormValid = false;
    }

    if (!newEmail.trim()) {
      setIsEmailValid(false);
      isFormValid = false;
    }

    if (!newMessage.trim()) {
      setIsMessageValid(false);
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSending(true);

    const isFormValid = formValidate();

    if (selectedPost && isFormValid) {
      commentsService.createComment({
        postId: selectedPost.id,
        name: newName,
        email: newEmail,
        body: newMessage,
      })
        .catch((err) => {
          throw err;
        })
        .then((newComment) => {
          setComments([...comments, newComment]);
        })
        .finally(() => {
          setNewMessage('');
          setIsFormSending(false);
        });
    } else {
      setIsFormSending(false);
    }
  };

  const clearForm = () => {
    setNewName('');
    setNewEmail('');
    setNewMessage('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleCreateComment}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={newName}
            onChange={handleSetNewName}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input', {
                'is-danger': !isNameValid,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNameValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNameValid && (
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
            value={newEmail}
            onChange={handleSetNewEmail}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input', {
                'is-danger': !isEmailValid,
              },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {!isEmailValid && (
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
            value={newMessage}
            onChange={handleSetNewMessage}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea', {
                'is-danger': !isMessageValid,
              },
            )}
          />
        </div>

        {!isMessageValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button', 'is-link', {
                'is-loading': isFormSending,
              },
            )}
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
