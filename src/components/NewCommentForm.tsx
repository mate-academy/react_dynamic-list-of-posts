import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  addComment: (comment: Comment) => void;
  post: Post;
  selectedUser?: User;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  post,
  selectedUser,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');

  const handleClear = () => {
    setTextError('');
    setEmailError('');
    setNameError('');
    setName('');
    setEmail('');
    setText('');
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // handleClear();

    e.preventDefault();

    if (!name || !email || !text) {
      setNameError('Something went wrong!');
      setEmailError('Something went wrong!');
      setTextError('Something went wrong!');

      return;
    }

    if (selectedUser) {
      const newComment = {
        postId: post.id,
        name: name,
        email: email,
        body: text,
      };

      addComment(newComment);

      handleClear();
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={e => formSubmit(e)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': !name && nameError,
            })}
            onChange={e => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!name && nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!name && nameError && (
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
            value={email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !email && emailError,
            })}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!email && emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!email && emailError && (
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
            value={text}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': !text && textError,
            })}
            onChange={e => setText(e.target.value)}
          />
        </div>

        {!text && textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
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
