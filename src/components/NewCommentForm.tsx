import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../utils/api';
import { getCorrectData } from '../utils/GetCorrectData';

type Props = {
  postId: number;
  updateComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, updateComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorBody, setHasErrorBody] = useState(false);

  const handlerOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
      setHasErrorName(false);
    }

    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setHasErrorEmail(false);
    }

    if (event.target.name === 'body') {
      setBody(event.target.value);
      setHasErrorBody(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorBody(false);
  };

  const handlerAddComment = (event: FormEvent) => {
    event.preventDefault();

    const correctName = getCorrectData(name);
    const correctEmail = getCorrectData(email);
    const correctBody = getCorrectData(body);

    setHasErrorName(!correctName);
    setHasErrorEmail(!correctEmail);
    setHasErrorBody(!correctBody);

    if (!correctName || !correctEmail || !correctBody) {
      return;
    }

    setIsloading(true);

    addComment({
      postId,
      name: correctName,
      email: correctEmail,
      body: correctBody,
    })
      .then(comment => {
        updateComments(currentComment => [...currentComment, comment]);
        setBody('');
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
      })
      .finally(() => setIsloading(false));
  };

  return (
    <>
      {showError && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Something went wrong!
        </div>
      )}

      <form
        data-cy="NewCommentForm"
        onSubmit={handlerAddComment}
        onReset={resetForm}
      >
        <div className="field" data-cy="NameField">
          <label className="label" htmlFor="comment-author-name">
            Author Name
          </label>

          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="name"
              value={name}
              id="comment-author-name"
              placeholder="Name Surname"
              className={cn('input', { 'is-danger': hasErrorName })}
              onChange={handlerOnChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasErrorName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasErrorName && (
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
              value={email}
              id="comment-author-email"
              placeholder="email@test.com"
              className={cn('input', { 'is-danger': hasErrorEmail })}
              onChange={handlerOnChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasErrorEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasErrorEmail && (
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
              value={body}
              placeholder="Type comment here"
              className={cn('textarea', { 'is-danger': hasErrorBody })}
              onChange={handlerOnChange}
            />
          </div>

          {hasErrorBody && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': isLoading })}
            >
              Add
            </button>
          </div>

          <div className="control">
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="reset" className="button is-link is-light">
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
