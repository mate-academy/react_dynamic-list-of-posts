import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  setComments: (arg: Comment[]) => void,
  POST_ID: number,
  setCommentError: (arg: boolean) => void,
  comments: Comment[] | null,
};

export const NewCommentForm: React.FC<Props> = ({
  setComments, POST_ID, setCommentError, comments,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [formError, setFormError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setFormError({
      name: false,
      email: false,
      body: false,
    });
    if (!formData.name.trim()) {
      setFormError((prevFormError) => ({ ...prevFormError, name: true }));
      setIsLoading(false);
    }

    if (!formData.email.trim()) {
      setFormError((prevFormError) => ({ ...prevFormError, email: true }));
      setIsLoading(false);
    }

    if (!formData.body.trim()) {
      setFormError((prevFormError) => ({ ...prevFormError, body: true }));
      setIsLoading(false);
    } else {
      createComment({
        postId: POST_ID,
        body: formData.body.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
      })
        .then((newItem: Comment) => {
          if (comments) {
            setComments([...comments, newItem]);
          } else {
            setComments([newItem]);
          }

          setFormData(prevData => ({
            ...prevData,
            body: '',
          }));
        })
        .catch(() => {
          setCommentError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    setFormData({
      name: '',
      email: '',
      body: '',
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classNames('input', {
              'is-danger': formError.name,
            })}
            value={formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {formError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {formError.name && (
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
              'is-danger': formError.email,
            })}
            value={formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {formError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {formError.email && (
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
              'is-danger': formError.body,
            })}
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        {formError.body && (
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
