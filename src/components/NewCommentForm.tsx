import React, { useContext, useState } from 'react';
import { DispatchContext, StatesContext } from '../context/Store';
import { postComment } from '../api/comments';
import classNames from 'classnames';

export const NewCommentForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { isLoading, selectedPostId } = useContext(StatesContext);

  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [body, setBody] = useState('');

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleOnEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleOnBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setBodyError(false);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'SET_ISLOADING', payload: true });

    setNameError(!name);
    setEmailError(!email);
    setBodyError(!body);

    if (!name || !email || !body) {
      dispatch({ type: 'SET_ISLOADING', payload: false });

      return;
    } else {
      if (selectedPostId) {
        const newComment = await postComment({
          name: name,
          email: email,
          body: body,
          postId: selectedPostId,
        });

        if ('Error' in newComment) {
          dispatch({
            type: 'SET_COMMENTERRORMESSAGE',
            payload: 'Something went wrong',
          });
          dispatch({ type: 'SET_ISLOADING', payload: false });

          return;
        }
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleOnNameChange}
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
            Name is required.
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleOnEmailChange}
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
            Email is required.
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
              'is-danger': bodyError,
            })}
            value={body}
            onChange={handleOnBodyChange}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text.
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
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
