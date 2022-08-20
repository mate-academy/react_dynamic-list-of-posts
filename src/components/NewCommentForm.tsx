import cn from 'classnames';
import React, { FormEvent, useCallback, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  postId: number;
  addComment: (newValue: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isSending, setIsSendign] = useState(false);

  const isErrorVisible = useCallback((field: string) => (
    !field.length && hasError
  ), [hasError]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name.length || !email.length || !body.length) {
      setHasError(true);
    } else {
      const newComment = {
        postId,
        name,
        email,
        body,
      };

      setIsSendign(true);
      client.post<CommentData>('/comments', newComment)
        .finally(() => {
          setIsSendign(false);
          setBody('');
        });

      addComment({ id: Math.random() + postId, ...newComment });
    }
  };

  const handleClear = useCallback(() => {
    setName('');
    setEmail('');
    setBody('');
    setHasError(false);
  }, []);

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
            className={cn('input',
              { 'is-danger': isErrorVisible(name) })}
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorVisible(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorVisible(name) && (
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
            className={cn('input',
              { 'is-danger': isErrorVisible(email) })}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorVisible(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorVisible(email) && (
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
            className={cn('textarea',
              { 'is-danger': isErrorVisible(body) })}
            value={body}
            onChange={event => setBody(event.target.value)}
          />
        </div>

        {isErrorVisible(body) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link',
              { 'is-loading': isSending })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
