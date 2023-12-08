import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../utils/api';
import { AppContext } from '../appContext';

export const NewCommentForm: React.FC = () => {
  const context = useContext(AppContext);
  const {
    selectedPost,
    setIsLoader,
    isLoader,
    comments,
    setComments,
  } = context;

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!name.trim());
    setHasEmailError(!email.trim());

    if (!body) {
      setBodyErrorMessage('Please enter some text');
    } else if (body.length < 5) {
      setBodyErrorMessage('Body should have at least 5 chars');
    }

    if (!name.trim() || !email.trim() || body.length < 5) {
      return;
    }

    setHasNameError(false);
    setIsLoader(true);
    setHasEmailError(false);
    setBodyErrorMessage('');

    const newComment = {
      postId: selectedPost ? selectedPost.id : 0,
      name,
      email,
      body,
    };

    addComment(newComment)
      .then((res) => {
        setComments([...comments, res]);
        setBody('');
      })
      .catch(() => setIsCommentError(true))
      .finally(() => setIsLoader(false));
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setIsLoader(false);
    setHasEmailError(false);
    setBodyErrorMessage('');
    setIsCommentError(false);
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
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            onChange={handleNameChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
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
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
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
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasEmailError,
            })}
            onChange={handleBodyChange}
          />
        </div>

        {bodyErrorMessage && (
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
              'is-loading': isLoader,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>

      {isCommentError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          You can&apos;t add a comment.
        </p>
      )}

    </form>
  );
};
