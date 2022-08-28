import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number,
  comments: Comment[],
  setComments(comments: Comment[]): void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames(
              'input',
              {
                'is-danger': nameError,
              },
            )}
            value={name}
            onChange={event => {
              setNameError(false);
              setName(event.target.value);
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              {
                'is-danger': emailError,
              },
            )}
            value={email}
            onChange={event => {
              setEmailError(false);
              setEmail(event.target.value);
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
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              {
                'is-danger': textError,
              },
            )}
            value={text}
            onChange={event => {
              setTextError(false);
              setText(event.target.value);
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
            className={classNames(
              'button',
              'is-link',
              {
                'is-loading': loading,
              },
            )}
            onClick={event => {
              event.preventDefault();

              if (!name) {
                setNameError(true);
              }

              if (!email) {
                setEmailError(true);
              }

              if (!text) {
                setTextError(true);
              }

              if (!name || !email || !text) {
                return;
              }

              setLoading(true);

              client.post<Comment>('/comments', {
                postId,
                name,
                email,
                body: text,
              }).then(response => {
                setLoading(false);
                setText('');

                setComments([...comments, response]);
              }).catch(() => setLoading(false));
            }}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={event => {
              event.preventDefault();
              setName('');
              setNameError(false);
              setEmail('');
              setEmailError(false);
              setText('');
              setTextError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
