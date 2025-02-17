/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [name, setName] = useState<string>('');
  const [errorName, setErrorName] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);

  const [body, setBody] = useState('');
  const [errorBody, setErrorBody] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorName(false);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(false);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setErrorBody(false);
  };

  const resetAll = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let mistake = false;

    if (!name) {
      setErrorName(true);
      mistake = true;
    }

    if (!email) {
      setErrorEmail(true);
      mistake = true;
    }

    if (!body) {
      setErrorBody(true);
      mistake = true;
    }

    if (mistake) {
      return;
    }

    setLoading(true);

    client
      .post<Comment>('/comments', {
        postId: postId,
        name: name,
        email: email,
        body: body,
      })
      .then(comment => {
        setComments(prevComments => [...prevComments, comment]);
        setBody('');
      })
      .finally(() => setLoading(false));
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
            className={classNames('input', { 'is-danger': errorName })}
            onChange={handleName}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            className={classNames('input', { 'is-danger': errorEmail })}
            onChange={handleEmail}
            value={email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={classNames('textarea', { 'is-danger': errorBody })}
            onChange={handleBody}
            value={body}
          />
        </div>

        {errorBody && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
