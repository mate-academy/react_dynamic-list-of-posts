import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  handleError: () => void
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  handleError,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isClickSubmit, setIsClickSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* eslint-disable-next-line max-len */
  const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  let isValidEmail = emailRegExp.test(emailValue);

  const handleChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setTextAreaValue(e.currentTarget.value);

  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setEmailValue(e.currentTarget.value);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setNameValue(e.currentTarget.value);

  const handleClickAddComment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsClickSubmit(true);

    if (!nameValue || !isValidEmail || !textAreaValue) {
      return;
    }

    setIsLoading(true);

    const reset = () => {
      setTextAreaValue('');
      setIsClickSubmit(false);
      setIsLoading(false);
    };

    client.post<Comment>(
      '/comments',
      {
        postId,
        name: nameValue,
        email: emailValue,
        body: textAreaValue,
      },
    )
      .then(response => {
        setComments(currentComments => [
          ...currentComments,
          response,
        ]);
        reset();
      })
      .catch(() => {
        handleError();
        reset();
      });
  };

  const handleClickClear = () => {
    setIsClickSubmit(false);
    setNameValue('');
    setEmailValue('');
    setTextAreaValue('');
    isValidEmail = true;
  };

  const isDangerName = isClickSubmit && !nameValue;
  const isDangerEmail = isClickSubmit && !isValidEmail;
  const isDangerTextArea = isClickSubmit && !textAreaValue;

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={nameValue}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': isDangerName },
            )}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isDangerName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isDangerName && (
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': isDangerEmail },
            )}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isDangerEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isDangerEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {!emailValue ? 'Email is required' : 'Example: "Vova@ukr.net"'}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={textAreaValue}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': isDangerTextArea },
            )}
            onChange={handleChangeTextArea}
          />
        </div>

        {isDangerTextArea && (
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
              'button is-link',
              { 'is-loading': isLoading },
            )}
            onClick={handleClickAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClickClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
