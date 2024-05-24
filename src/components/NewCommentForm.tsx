import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { CommentType } from '../types/CommentType';

export const NewCommentForm: React.FC = () => {
  const { choosedPost, isDataSend } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    postId: choosedPost?.id,
  });
  const { name, email, body } = newComment;
  const [validation, setValidation] = useState({
    isCorrectName: false,
    isCorrectEmail: false,
    isCorrectBody: false,
  });
  const { isCorrectName, isCorrectEmail, isCorrectBody } = validation;

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    setValidation(prev => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedBody = body.trim();

      if (!trimmedName || !trimmedEmail || !trimmedBody) {
        if (!trimmedName) {
          setValidation(prev => ({ ...prev, isCorrectName: true }));
        }

        if (!trimmedEmail) {
          setValidation(prev => ({ ...prev, isCorrectEmail: true }));
        }

        if (!trimmedBody) {
          setValidation(prev => ({ ...prev, isCorrectBody: true }));
        }

        return;
      }

      dispatch({
        type: 'isDataSend',
        isDataSend: true,
        newComment: {
          postId: newComment.postId,
          name: trimmedName,
          email: trimmedEmail,
          body: trimmedBody
        }
      });

      await client.post<CommentType[]>(`/comments`, {
        postId: newComment.postId,
        name: trimmedName,
        email: trimmedEmail,
        body: trimmedBody
      });
    } catch (error) {
      dispatch({ type: 'isDataSend', isDataSend: false });
      dispatch({ type: 'setCommentsFetchError', commentsFetchError: true });
      dispatch({ type: 'isOpenNewCommentForm', isOpenNewCommentForm: true });
    } finally {
      dispatch({ type: 'isDataSend', isDataSend: false });

      setNewComment({
        name: name.trim(),
        email: email.trim(),
        body: '',
        postId: choosedPost?.id,
      });
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
      isCorrectName: false,
      isCorrectEmail: false,
      isCorrectBody: false,
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
            className={classNames('input', { 'is-danger': isCorrectName })}
            value={name}
            onChange={handleChangeInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isCorrectName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isCorrectName && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': isCorrectEmail })}
            value={email}
            onChange={handleChangeInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isCorrectEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isCorrectEmail && (
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
            className={classNames('textarea', { 'is-danger': isCorrectBody })}
            value={body}
            onChange={handleChangeInput}
          />
        </div>

        {isCorrectBody && (
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
