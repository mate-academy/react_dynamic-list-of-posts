import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addCommentOnServer: (newComment: Comment) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addCommentOnServer,
}) => {
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [textErr, setTextErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isPassValid = true;

    if (!name.trim()) {
      setNameErr(true);
      isPassValid = false;
    }

    if (!text.trim()) {
      setTextErr(true);
      isPassValid = false;
    }

    if (!email.trim()) {
      setEmailErr(true);
      isPassValid = false;
    }

    if (!isPassValid) {
      return;
    }

    setIsLoading(true);
    addCommentOnServer({
      id: 0,
      name,
      postId,
      body: text,
      email,
    })
      .then(() => {
        setText('');
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clear = () => {
    setEmailErr(false);
    setNameErr(false);
    setTextErr(false);
    setName('');
    setEmail('');
    setText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
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
            className={classNames('input', { 'is-danger': nameErr })}
            onFocus={() => setNameErr(false)}
            onChange={e => setName(e.target.value)}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameErr && (
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
            className={classNames('input', { 'is-danger': emailErr })}
            onFocus={() => setEmailErr(false)}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailErr && (
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
            className={classNames('textarea', { 'is-danger': textErr })}
            onFocus={() => setTextErr(false)}
            onChange={e => setText(e.target.value)}
            value={text}
          />
        </div>

        {textErr && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
