import React, { useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  setAddError: (err: boolean) => void;
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setAddError,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post){

      return;
    }

    if (!name || !email || !text) {
      setError(true);

      return;
    }

    setLoading(true);

    const newComment = {
      postId: post.id,
      name: name,
      email: email,
      body: text,
    };

    client
      .post<Comment>('/comments', newComment)
      .then(result => {
        setText('');
        onAdd(result);
      })
      .catch(() => setAddError(true))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setText('');
    setError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={e => handleAdd(e)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            value={name}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': error && !name,
            })}
            onChange={e => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error && !name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error && !name && (
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
            value={email}
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': error && !email,
            })}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error && !email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error && !email && (
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
            value={text}
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': error && !text,
            })}
            onChange={e => setText(e.target.value)}
          />
        </div>

        {error && !text && (
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
              'is-loading': loading,
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
            onClick={() => handleReset()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
