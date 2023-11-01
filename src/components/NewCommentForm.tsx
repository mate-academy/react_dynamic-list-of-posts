import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  onAddComment: (comm: Comment) => Promise<void>,
  name: string,
  email: string,
  body: string,
  setName: (n: string) => void,
  setEmail: (em: string) => void,
  setBody: (b: string) => void,
  postId: number | undefined,
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  name,
  email,
  body,
  setName = () => {},
  setEmail = () => {},
  setBody = () => {},
  postId,
}) => {
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorBody, setErrorBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorName('');
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorEmail('');
  };

  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setErrorBody('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorName('Name is required');
    }

    if (!email.trim()) {
      setErrorEmail('Email is required');
    }

    if (!body.trim()) {
      setErrorBody('Enter some text');
    }

    if (name.trim() && email.trim() && body.trim() && postId) {
      setLoading(true);
      onAddComment({
        id: 0,
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      })
        .finally(() => setLoading(false));
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={errorName ? 'input is-danger' : 'input'}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {
            errorName && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
          }
        </div>

        {
          errorName && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorName}
            </p>
          )
        }
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
            className={errorEmail ? 'input is-danger' : 'input'}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {
            errorEmail && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
          }
        </div>

        {
          errorEmail && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorEmail}
            </p>
          )
        }
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
            className={errorBody ? 'textarea is-danger' : 'textarea'}
            value={body}
            onChange={handleBody}
          />
        </div>

        {
          errorBody && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorBody}
            </p>
          )
        }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={loading
              ? 'button is-link is-loading'
              : 'button is-link'}
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
