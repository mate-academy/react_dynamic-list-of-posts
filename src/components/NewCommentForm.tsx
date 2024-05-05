import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { postComment } from '../api/postComment';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useContext(DispatchContext);
  const { comments } = useContext(StateContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);

    if (!email || !name || !body) {
      setIsError(true);

      return;
    }

    setIsLoading(true);

    postComment({ email, name, postId, body })
      .then(data => {
        dispatch({ type: 'setComments', payload: [...comments, data] });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setBody('');
      });
  };

  const reset = () => {
    setIsLoading(false);
    setBody('');
    setEmail('');
    setName('');
    setIsError(false);
  };

  useEffect(() => {
    setIsError(false);
  }, [email, body, name]);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={reset}>
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
            value={name}
            onChange={e => setName(e.target.value)}
            className={classNames('input', {
              'is-danger': isError && !name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError && !name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError && !name && (
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
            onChange={e => setEmail(e.target.value)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isError && !email,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError && !email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError && !email && (
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
            onChange={e => setBody(e.target.value)}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': isError && !body,
            })}
          />
        </div>

        {isError && !body && (
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
              'is-loading': isLoading,
            })}
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
  );
};
