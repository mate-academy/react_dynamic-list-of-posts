import React, { FormEvent, useState } from 'react';
import { Comment } from '../types/Comment';
import { addComment } from '../utils/fetchClient';
import cn from 'classnames';
import { getCorrectValue } from '../utils/getCorrectValue';

type Props = {
  postId: number;
  updateComent: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, updateComent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isError, setIsError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
      setHasNameError(false);
    }

    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setHasEmailError(false);
    }

    if (event.target.name === 'body') {
      setBody(event.target.value);
      setHasBodyError(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleAddComment = (event: FormEvent) => {
    event.preventDefault();

    const correctName = getCorrectValue(name);
    const correctEmail = getCorrectValue(email);
    const correctBody = getCorrectValue(body);

    setHasNameError(!correctName);
    setHasEmailError(!correctEmail);
    setHasBodyError(!correctBody);

    if (!correctName || !correctEmail || !correctBody) {
      return;
    }

    setIsLoading(true);

    addComment({
      postId,
      name: correctName,
      email: correctEmail,
      body: correctBody,
    })
      .then(comment => {
        updateComent(currentComment => [...currentComment, comment]);
        setBody('');
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isError && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Something went wrong!
        </div>
      )}

      <form
        data-cy="NewCommentForm"
        onSubmit={handleAddComment}
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
              className={cn('input', { 'is-danger': hasNameError })}
              onChange={handleOnChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {hasNameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasNameError && (
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
              type="email"
              value={email}
              name="email"
              id="comment-author-email"
              placeholder="email@test.com"
              className={cn('input', { 'is-danger': hasEmailError })}
              onChange={handleOnChange}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {hasEmailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {hasEmailError && (
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
              value={body}
              name="body"
              placeholder="Type comment here"
              className={cn('textarea', { 'is-danger': hasBodyError })}
              onChange={handleOnChange}
            />
          </div>

          {hasBodyError && (
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
