import React, { useState } from 'react';
import classNames from 'classnames';
import { usePostInfo } from '../utils/PostContext';
import * as commentServices from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPost,
    setComments,
    isCommentSubmitting,
    setIsCommentSubmitting,
    setErrHandleComment,
  } = usePostInfo();

  const initFormValue = {
    name: '',
    nameHasErr: false,
    email: '',
    emailHasErr: false,
    body: '',
    bodyHasErr: false,
  };

  const [formValue, setFormValue] = useState(initFormValue);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    const keyHasErr = `${name}HasErr`;

    setFormValue(prevValue => ({
      ...prevValue,
      [name]: value,
      [keyHasErr]: false,
    }));
  };

  const handleAddComment = async () => {
    setErrHandleComment(false);
    setIsCommentSubmitting(true);
    const { email, name, body } = formValue;

    if (selectedPost) {
      const newCommentData = {
        postId: selectedPost?.userId,
        name,
        email,
        body,
      };

      try {
        const newComment = await commentServices.createComment(newCommentData);

        setComments(prevState => [...prevState, newComment]);
      } catch (error) {
        setErrHandleComment(true);
      } finally {
        setIsCommentSubmitting(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddComment();
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
              'is-danger': formValue.nameHasErr,
            })}
            value={formValue.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
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
              'is-danger': formValue.emailHasErr,
            })}
            value={formValue.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
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
              'is-danger': formValue.bodyHasErr,
            })}
            value={formValue.body}
            onChange={handleInputChange}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isCommentSubmitting,
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
