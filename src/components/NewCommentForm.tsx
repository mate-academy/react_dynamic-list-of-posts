import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { postComment } from '../api/comments';
import { PostsContext } from '../PostsContext';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [isBodyError, setIsBodyError] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { selectedPost, setComments } = useContext(PostsContext);

  const handleNameChange = (newName: string) => {
    setIsNameError(false);
    setName(newName);
  };

  const handleEmailChange = (newEmail: string) => {
    setIsEmailError(false);
    setEmail(newEmail);
  };

  const handleBodyChange = (newBody: string) => {
    setIsBodyError(false);
    setBody(newBody);
  };

  const handleReset = () => {
    setName('');
    setIsNameError(false);
    setEmail('');
    setIsEmailError(false);
    setBody('');
    setIsBodyError(false);
    setIsAddingComment(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsNameError(!name.trim());
    setIsEmailError(!email.trim());
    setIsBodyError(!body.trim());

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    setIsAddingComment(true);

    postComment({
      name,
      email,
      body,
      postId: selectedPost?.id as number,
    })
      .then((newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
        setBody('');
        setIsAddingComment(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={event => handleNameChange(event.target.value)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': isNameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            onChange={event => handleEmailChange(event.target.value)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            value={body}
            onChange={event => handleBodyChange(event.target.value)}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': isBodyError,
            })}
          />
        </div>

        {isBodyError && (
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
              'is-loading': isAddingComment,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
