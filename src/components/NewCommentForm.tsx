import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number | undefined;
  comments: Comment[] | null;
  setComments: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [toShowErrors, setToShowErrors] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !body.trim()) {
      setToShowErrors(true);

      return;
    }

    setIsLoading(true);

    client.post<Comment>('/comments', {
      postId: selectedPostId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    })
      .then((newComment) => {
        if (!comments) {
          return;
        }

        setComments([...comments, newComment]);
      })
      .finally(() => setIsLoading(false));

    setToShowErrors(false);
    setBody('');
  };

  const handleClear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setName('');
    setEmail('');
    setBody('');
    setToShowErrors(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
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
            className={classNames('input', {
              'is-danger': toShowErrors && !name.trim(),
            })}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {toShowErrors && !name.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {toShowErrors && !name.trim() && (
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
            className={classNames('input', {
              'is-danger': toShowErrors && !email.trim(),
            })}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {toShowErrors && !email.trim() && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {toShowErrors && !email.trim() && (
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
            className={classNames('textarea', {
              'is-danger': toShowErrors && !body.trim(),
            })}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>

        {toShowErrors && !body.trim() && (
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
              'is-loading': IsLoading,
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
