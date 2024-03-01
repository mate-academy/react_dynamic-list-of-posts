import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Context } from '../context/Context';
import * as commentService from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const defaultState = { value: '', hasError: false };

  const [name, setName] = useState(defaultState);
  const [email, setEmail] = useState(defaultState);
  const [body, setBody] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedPost, setComments } = useContext(Context);

  const reset = () => {
    setBody(prevBody => ({ ...prevBody, value: '' }));

    setEmail(prevEmail => ({ ...prevEmail, hasError: false }));
    setName(prevName => ({ ...prevName, hasError: false }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (name.value.trim() === '') {
      setName(prevName => ({ ...prevName, hasError: true }));
    }

    if (email.value.trim() === '') {
      setEmail(prevEmail => ({ ...prevEmail, hasError: true }));
    }

    if (body.value.trim() === '') {
      setBody(prevBody => ({ ...prevBody, hasError: true }));
    }

    if (
      name.value.trim() === '' ||
      email.value.trim() === '' ||
      body.value.trim() === ''
    ) {
      setIsLoading(false);

      return;
    }

    const newComment = {
      postId: selectedPost?.id,
      name: name.value.trim(),
      email: email.value.trim(),
      body: body.value.trim(),
    };

    commentService
      .addComment(newComment)
      .then(res => {
        if ('error' in res) {
          throw new Error();
        } else {
          setComments(currentComments => [...currentComments, res]);
          reset();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClearForm = () => {
    setName({ value: '', hasError: false });
    setEmail({ value: '', hasError: false });
    setBody({ value: '', hasError: false });
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
            className={cn('input', { 'is-danger': name.hasError })}
            value={name.value}
            onChange={e => setName({ value: e.target.value, hasError: false })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!name.hasError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
            className={cn('input', { 'is-danger': email.hasError })}
            value={email.value}
            onChange={e => setEmail({ value: e.target.value, hasError: false })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!email.hasError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
            className={cn('textarea', { 'is-danger': body.hasError })}
            value={body.value}
            onChange={e => setBody({ value: e.target.value, hasError: false })}
          />
        </div>

        {!!body.hasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
