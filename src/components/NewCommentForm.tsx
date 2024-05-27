import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../utils/Store';
import { postComment } from '../api/posts';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const state = useContext(StateContext);
  const { comments } = state;
  const dispatch = useContext(DispatchContext);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !body.trim() || !email) {
      setIsError(true);

      return;
    }

    const comment = {
      postId,
      name,
      email,
      body: body.trim(),
    };

    setLoading(true);

    postComment(comment)
      .then(newComment => {
        dispatch({
          type: 'setComments',
          payload: [...comments, newComment],
        });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
        setBody('');
      });
  };

  const reset = () => {
    setBody('');
    setEmail('');
    setName('');
    setIsError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submit} onReset={reset}>
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
              'is-danger': isError && !name.trim(),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError && !name.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError && !name.trim() && (
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
              'is-danger': isError && !email.trim(),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError && !email.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError && !email.trim() && (
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
            className={classNames('input', {
              'is-danger': isError && !body.trim(),
            })}
          />
        </div>

        {isError && !body.trim() && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
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
