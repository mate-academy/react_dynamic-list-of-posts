import React, { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { CommentData } from '../types/Comment';
import { Errors } from '../enums/Errors';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    text: '',
  });
  const [formErrors, setFormErrors] = useState({
    nameError: false,
    emailError: false,
    textError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost, setComments, setErrorMessage } = useContext(AppContext);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
    setFormErrors({ ...formErrors, [`${name}Error`]: false });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email, text } = userData;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (!trimmedName || !trimmedEmail || !trimmedText) {
      setFormErrors({
        nameError: trimmedName.length === 0,
        emailError: !trimmedEmail,
        textError: !trimmedText,
      });

      return;
    }

    setIsLoading(true);

    const newComment: CommentData = {
      postId: selectedPost ? selectedPost.id : 0,
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedText,
    };

    addComment(newComment)
      .then((commentToAdd: CommentData) => {
        setComments((prevComments: Comment[]) => [
          ...prevComments,
          commentToAdd as Comment,
        ]);
        setUserData({ name: '', email: '', text: '' });
      })
      .catch(() => setErrorMessage(Errors.LoadError))
      .finally(() => setIsLoading(false));
  };

  const handleClear = () => {
    setUserData({ name: '', email: '', text: '' });
    setFormErrors({
      nameError: false,
      emailError: false,
      textError: false,
    });
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
            value={userData.name}
            className={classNames('input', {
              'is-danger': formErrors.nameError,
            })}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.nameError && (
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
            value={userData.email}
            className={classNames('input', {
              'is-danger': formErrors.emailError,
            })}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.emailError && (
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
            name="text"
            placeholder="Type comment here"
            value={userData.text}
            className={classNames('input', {
              'is-danger': formErrors.textError,
            })}
            onChange={handleChange}
          />
        </div>

        {formErrors.textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
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
