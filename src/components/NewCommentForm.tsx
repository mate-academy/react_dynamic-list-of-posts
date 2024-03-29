import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { postComment } from '../api/coments';
import { Comment, CommentResponse } from '../types/Comment';
import { Context, DispatchContext } from '../Store';

export const NewCommentForm: React.FC = () => {
  const { currentPost } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  const [inputName, setInputName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [inputBody, setInputBody] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputName.trim() === '') {
      setNameError(true);
    }

    if (inputEmail.trim() === '') {
      setEmailError(true);
    }

    if (inputBody.trim() === '') {
      setBodyError(true);
    }

    if (
      inputName.trim() &&
      inputEmail.trim() &&
      inputBody.trim() &&
      currentPost
    ) {
      const comment: Omit<Comment, 'id'> = {
        postId: currentPost.id,
        name: inputName,
        email: inputEmail,
        body: inputBody,
      };

      setLoading(true);
      postComment(comment)
        .then((response: CommentResponse) => {
          dispatch({
            type: 'addComment',
            payload: response,
          });
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
      setNameError(false);
      setEmailError(false);
      setInputBody('');
      setBodyError(false);
    }
  };

  const handleClear = () => {
    setInputName('');
    setNameError(false);
    setInputEmail('');
    setEmailError(false);
    setInputBody('');
    setBodyError(false);
  };

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
            value={inputName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameError })}
            onChange={e => {
              setInputName(e.target.value);
              setNameError(false);
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
            value={inputEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            onChange={e => {
              setInputEmail(e.target.value);
              setEmailError(false);
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
            value={inputBody}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': bodyError })}
            onChange={e => {
              setInputBody(e.target.value);
              setBodyError(false);
            }}
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
            onClick={e => handleAddComment(e)}
            className={cn('button', 'is-link', {
              'is-loading': loading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
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
