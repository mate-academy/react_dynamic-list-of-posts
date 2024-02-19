import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../management/StateContext';

export const NewCommentForm: React.FC = () => {
  // #region state
  const { currentPost, isLoaderAddComment } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  //  #endregion
  // #region handler

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setHasBodyError(false);
  };

  // #endregion

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasNameError(!name.trim());
    setHasEmailError(!email.trim());
    setHasBodyError(!body.trim());

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    let postId = 0;

    if (currentPost) {
      postId = currentPost.id;
    }

    const data = {
      name,
      email,
      body,
      postId,
    };

    dispatch({ type: 'newComment', payload: data });
    setBody('');
  };

  const handleResetForm = () => {
    setBody('');
    setName('');
    setEmail('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => handleSubmitForm(e)}
      onReset={handleResetForm}
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasBodyError,
            })}
            onChange={handleBodyChange}
          />
        </div>

        {hasBodyError && (
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
              'is-loading': isLoaderAddComment,
            })}
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
