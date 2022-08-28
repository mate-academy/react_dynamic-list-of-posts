import React, { useState } from 'react';

import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ addComment, postId }) => {
  const [commentData, setCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentData(prevCommentData => ({
      ...prevCommentData,
      [event.target.name]: event.target.value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [event.target.name]: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, body } = commentData;

    if (!name) {
      setErrors(stateErrors => ({
        ...stateErrors,
        name: true,
      }));
    }

    if (!email) {
      setErrors(stateErrors => ({
        ...stateErrors,
        email: true,
      }));
    }

    if (!body) {
      setErrors(stateErrors => ({
        ...stateErrors,
        body: true,
      }));
    }

    if (!name || !email || !body) {
      return;
    }

    setLoader(true);
    client.post<Comment>('/comments', {
      ...commentData,
      postId,
    })
      .then(comment => {
        addComment(comment);
        setCommentData({
          ...commentData,
          body: '',
        });
      })
      .finally(() => setLoader(false));
  };

  const handleReset = () => {
    setCommentData({
      name: '',
      email: '',
      body: '',
    });
    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames(
              'input',
              { 'is-danger': errors.name },
            )}
            value={commentData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            className={classNames(
              'input',
              { 'is-danger': errors.email },
            )}
            value={commentData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            className={classNames(
              'input',
              { 'is-danger': errors.body },
            )}
            value={commentData.body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
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
              'button',
              'is-link',
              { 'is-loading': loader },
            )}
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
