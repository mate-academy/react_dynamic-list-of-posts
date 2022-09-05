import React, { FormEvent, useState } from 'react';
import classnames from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onUpdate: (response: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [hasName, setHasName] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [hasText, setHasText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const postComment = () => {
    const comment = {
      postId,
      name,
      email,
      body: text,
    };

    setIsLoading(true);

    return client.post('/comments', comment)
      .then((response: any) => {
        onUpdate(response);
        setIsLoading(false);
        setText('');
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setHasName((prev) => !prev);
    }

    if (!email) {
      setHasEmail((prev) => !prev);
    }

    if (!text) {
      setHasText((prev) => !prev);
    }

    if (name && email && text) {
      postComment();
    }
  };

  const handleClear = () => {
    setEmail('');
    setName('');
    setText('');
    setHasEmail(true);
    setHasName(true);
    setHasText(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
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
            className={classnames('input', { 'is-danger': !hasName })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setHasName(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!hasName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!hasName && (
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
            className={classnames('input', { 'is-danger': !hasEmail })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setHasEmail(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!hasEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!hasEmail && (
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
            className={classnames('textarea', { 'is-danger': !hasText })}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setHasText(true);
            }}
          />
        </div>

        {!hasText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classnames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
            )}
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
