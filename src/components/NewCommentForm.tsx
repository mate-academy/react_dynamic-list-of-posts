import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';

interface Props {
  isAddingComment: boolean;
  addNewComment: (data: CommentData) => void,
}

export const NewCommentForm: React.FC<Props> = ({
  isAddingComment,
  addNewComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errName, setErrName] = useState(false);
  const [errEmail, seErrtEmail] = useState(false);
  const [errBody, setErrBody] = useState(false);

  const handleAddNewComment = () => {
    if (!name || !email || !body) {
      setErrName(name === '');
      seErrtEmail(email === '');
      setErrBody(body === '');

      return;
    }

    addNewComment({ name, email, body });
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (!isAddingComment) {
          handleAddNewComment();
        }
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
            className={cn('input', { 'is-danger': errName })}
            value={name}
            onChange={(({ target }) => {
              setName(target.value);
              setErrName(false);
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errName && (
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
            className={cn('input', { 'is-danger': errEmail })}
            value={email}
            onChange={(({ target }) => {
              setEmail(target.value);
              seErrtEmail(false);
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errEmail && (
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
            className={cn('textarea', { 'is-danger': errBody })}
            value={body}
            onChange={(({ target }) => {
              setBody(target.value);
              setErrBody(false);
            })}
          />
        </div>
        {errBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isAddingComment })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setName('');
              setErrName(false);
              setEmail('');
              seErrtEmail(false);
              setBody('');
              setErrBody(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
