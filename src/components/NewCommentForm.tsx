import React, { useState } from 'react';
import { addComment } from '../api/comments';

type Props = {
  postId: number;
  onCommentAdded: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postId) {
      return;
    }

    let hasError = false;

    if (name.trim() === '') {
      setNameError(true);
      hasError = true;
    }

    if (email.trim() === '') {
      setEmailError(true);
      hasError = true;
    }

    if (text.trim() === '') {
      setTextError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSending(true);

    addComment({
      postId: postId,
      name: name,
      email: email,
      body: text,
    })
      .then(() => {
        setText('');

        setNameError(false);
        setEmailError(false);
        setTextError(false);

        onCommentAdded();
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setText('');

    setNameError(false);
    setEmailError(false);
    setTextError(false);
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
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${nameError && 'is-danger'}`}
            onChange={e => {
              setNameError(false);
              setName(e.target.value);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${emailError && 'is-danger'}`}
            onChange={e => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {emailError && (
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
            value={text}
            placeholder="Type comment here"
            className={`textarea ${textError && 'is-danger'}`}
            onChange={e => {
              setTextError(false);
              setText(e.target.value);
            }}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSending && 'is-loading'}`}
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
