import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  isAdding: boolean;
  addComment: (comment: Comment) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  isAdding,
  addComment,
  postId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setbody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    if (!name) {
      setNameError(true);

      return;
    }

    if (!email) {
      setEmailError(true);

      return;
    }

    if (!body) {
      setBodyError(true);

      return;
    }

    const newComment: Comment = {
      id: 0,
      postId,
      name,
      email,
      body,
    };

    addComment(newComment);
    setbody('');
  }

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const changebody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setbody(event.target.value);
    setBodyError(false);
  };

  const resetAll = () => {
    setName('');
    setEmail('');
    setbody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => submitForm(e)}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="body"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={
              classNames('input', {
                'is-danger': nameError,
              })
            }
            value={name}
            onChange={(e) => changeName(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-body-danger"
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
            type="body"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={
              classNames('input', {
                'is-danger': emailError,
              })
            }
            value={email}
            onChange={e => changeEmail(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-body-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p
            className={
              classNames('help', {
                'is-danger': emailError,
              })
            }
            data-cy="ErrorMessage"
          >
            Email is required
          </p>
        )}

      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment body
        </label>

        <div className="control">
          <textarea
            id="comment-text"
            name="text"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={body}
            onChange={e => changebody(e)}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              classNames(
                'button is-link', {
                  'is-loading': isAdding,
                },
              )
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={() => resetAll()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
