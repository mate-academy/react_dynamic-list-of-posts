import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../api/posts';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [hasRequestError, setHasRequestError] = useState(false);
  const [hasErrorAutor, setHasErrorAutor] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorText, setHasErrorText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;

    if (!author) {
      hasErrors = true;

      setHasErrorAutor(true);
    }

    if (!email) {
      hasErrors = true;

      setHasErrorEmail(true);
    }

    if (!text) {
      hasErrors = true;

      setHasErrorText(true);
    }

    if (hasErrors) {
      return;
    }

    const newComment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'> = {
      postId,
      name: author,
      email,
      body: text,
    };

    setIsLoading(true);

    postComment(newComment)
      .then(comment => {
        setComments(prev => [...prev, comment]);
        setText('');
      })
      .catch(() => {
        setHasRequestError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearFields = () => {
    setAuthor('');
    setEmail('');
    setText('');
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
            className={classNames('input', { 'is-danger': hasErrorAutor })}
            value={author}
            onChange={e => {
              if (e.target.value) {
                setHasErrorAutor(false);
              }

              setAuthor(e.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorAutor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorAutor && (
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
            className={classNames('input', { 'is-danger': hasErrorEmail })}
            value={email}
            onChange={e => {
              if (e.target.value) {
                setHasErrorEmail(false);
              }

              setEmail(e.target.value);
            }}
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
            placeholder="Type comment here"
            className={classNames('input', { 'is-danger': hasErrorText })}
            value={text}
            onChange={e => {
              if (e.target.value) {
                setHasErrorText(false);
              }

              setText(e.target.value);
            }}
          />
        </div>

        {hasErrorText && (
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
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
