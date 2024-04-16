import React, { useContext, useState } from 'react';
import { AppContext } from '../context/context';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { CommentData } from '../types/Comment';
import { Errors } from '../enums/Errors';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const [authorName, setAuthorName] = useState<string>('');
  const [nameError, setNameError] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost, setComments, setErrorMessage } = useContext(AppContext);

  const handleChangeAuthorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNameError(false);
    setAuthorName(event.target.value);
  };

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setAuthorEmail(event.target.value);
  };

  const handleOnTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextError(false);
    setText(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!authorName || !authorEmail || !text) {
      setNameError(!authorName);
      setEmailError(!authorEmail);
      setTextError(!text);

      return;
    }

    setIsLoading(true);

    const newComment = {
      postId: selectedPost ? selectedPost.id : 0,
      name: authorName,
      email: authorEmail,
      body: text,
    };

    addComment(newComment)
      .then((commentToAdd: CommentData) => {
        setComments((prevComments: Comment[]) => [
          ...prevComments,
          commentToAdd as unknown as Comment,
        ]);
        setText('');
      })
      .catch(() => setErrorMessage(Errors.LoadError))
      .finally(() => setIsLoading(false));
  };

  const handleOnClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setText('');

    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
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
            value={authorName}
            className={classNames('input', { 'is-danger': nameError })}
            onChange={handleChangeAuthorName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={authorEmail}
            onChange={handleOnEmailChange}
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
            className={classNames('input', { 'is-danger': textError })}
            value={text}
            onChange={handleOnTextChange}
          />
        </div>

        {textError && (
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
            onClick={handleOnSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleOnClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
