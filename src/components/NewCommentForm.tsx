import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post | null,
  setPostsComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setCommentErrorMessage: (value: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setPostsComments,
  setCommentErrorMessage,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
  });
  const [formError, setFormError] = useState({
    name: '',
    email: '',
    text: '',
  });

  const isEmptyField = !formData.name.trim()
    || !formData.email.trim()
    || !formData.text.trim();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement
  | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormError((prevError) => ({
      ...prevError,
      [name]: '',
    }));
  };

  const createComment = ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    return client.post<Comment>('/comments', {
      postId, name, email, body,
    });
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required',
      }));
    }

    if (!formData.email.trim()) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
    }

    if (!formData.text.trim()) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        text: 'Enter some text',
      }));
    }

    if (selectedPost?.id && !isEmptyField) {
      setIsFormLoading(true);

      createComment({
        postId: selectedPost.id,
        name: formData.name,
        email: formData.email,
        body: formData.text,
      })
        .then((newComment) => {
          setPostsComments((currentComments) => [
            ...currentComments, newComment,
          ]);
        })
        .catch(() => {
          setCommentErrorMessage('Can not load comments');
        })
        .finally(() => {
          setFormData({
            name: '',
            email: '',
            text: '',
          });
          setIsFormLoading(false);
        });
    }
  };

  const onClear = () => {
    setFormError({
      name: '',
      email: '',
      text: '',
    });

    setFormData({
      name: '',
      email: '',
      text: '',
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addComment}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
              'is-danger': formError.text,
            })}
            value={formData.text}
            onChange={handleInputChange}
          />
        </div>

        {formError.text && (
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
              'is-loading': isFormLoading,
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
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
