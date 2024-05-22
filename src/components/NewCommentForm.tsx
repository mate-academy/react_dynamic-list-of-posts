import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';

export const NewCommentForm: React.FC = () => {
  const { choosedPost, isDataSend } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    postId: choosedPost?.id,
  });
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    setValidation(prev => ({ ...prev, [e.target.name]: false }));
  };

  const postComment = async () => {
    try {
      dispatch({ type: 'isDataSend', isDataSend: true, newComment: newComment });
      await client.post<any[]>(`/comments`, {
          postId: newComment.postId,
          name: newComment.name.trim(),
          email: newComment.email.trim(),
          body: newComment.body.trim()
        },
      );
    } catch (error) {
      dispatch({ type: 'isDataSend', isDataSend: false });
      dispatch({ type: 'setCommentsFetchError', commentsFetchError: true });
      dispatch({ type: 'isOpenNewCommentForm', isOpenNewCommentForm: true });
    } finally {
      dispatch({ type: 'isDataSend', isDataSend: false });
      setNewComment({
        name: newComment.name.trim(),
        email: newComment.email.trim(),
        body: '',
        postId: choosedPost?.id,
      })
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newComment.name || !newComment.email || !newComment.body) {
      if (!newComment.name) {
        setValidation(prev => ({ ...prev, name: true }));
      }
      if (!newComment.email) {
        setValidation(prev => ({ ...prev, email: true }));
      }
      if (!newComment.body) {
        setValidation(prev => ({ ...prev, body: true }));
      }
      return;
    } else {
      postComment();
    }
  };

  const handleClearForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setNewComment({
      name: '',
      email: '',
      body: '',
      postId: choosedPost?.id,
    });
    setValidation({
      name: false,
      email: false,
      body: false,
    });
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': validation.name })}
            value={newComment.name}
            onChange={handleChangeInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {validation.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validation.name && (
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
            className={classNames('input', { 'is-danger': validation.email })}
            value={newComment.email}
            onChange={handleChangeInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {validation.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {validation.email && (
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
            className={classNames('textarea', { 'is-danger': validation.body })}
            value={newComment.body}
            onChange={handleChangeInput}
          />
        </div>

        {validation.body && (
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
              'button is-link',
              { 'is-loading': isDataSend }
            )}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
