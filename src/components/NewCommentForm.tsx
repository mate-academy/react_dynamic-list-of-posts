import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Comment } from '../types/Comment';
import { createComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    comments,
    setComments,
    selectedPost,
    setIsErrorComments,
  } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isTextAreaError, setIsTextEreaError] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleButtonClear = () => {
    setName('');
    setEmail('');
  };

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsNameError(false);
  };

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailError(false);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsTextEreaError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const conditional = !name.trim() || !email.trim() || !text.trim();

    if (conditional) {
      setIsNameError(!name);
      setIsEmailError(!email);
      setIsTextEreaError(!text);

      return;
    }

    setIsLoadingButton(true);

    createComment({
      name,
      email,
      body: text,
      postId: selectedPost?.id,
    })
      .then((newComment: Comment) => {
        setComments([...comments, newComment]);
        setText('');
      })
      .catch(() => setIsErrorComments(true))
      .finally(() => setIsLoadingButton(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames('input', { 'is-danger': isNameError })}
            value={name}
            onChange={handleInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', { 'is-danger': isEmailError })}
            value={email}
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames('textarea', { 'is-danger': isTextAreaError })}
            value={text}
            onChange={handleTextarea}
          />
        </div>

        {isTextAreaError && (
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
              'is-loading': isLoadingButton,
            })}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleButtonClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
