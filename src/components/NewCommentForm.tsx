import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  createComment: (postId: number, newComment: CommentData) => Promise<Comment>;
  selectedPost: Post;
  isSubmitting: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  createComment,
  selectedPost,
  isSubmitting,
}) => {
  const [commentData, setCommentData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorBody, setErrorBody] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setCommentData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'name') {
      setErrorName('');
    }

    if (name === 'email') {
      setErrorEmail('');
    }

    if (name === 'body') {
      setErrorBody('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    setErrorName('');
    setErrorEmail('');
    setErrorBody('');

    if (commentData.name.trim().length === 0) {
      setErrorName('Name is required');
      isValid = false;
    }

    if (commentData.email.trim().length === 0) {
      setErrorEmail('Email is required');
      isValid = false;
    }

    if (commentData.body.trim().length === 0) {
      setErrorBody('Enter some text');
      isValid = false;
    }

    return isValid;
  };

  const handleClear = () => {
    setCommentData({
      name: '',
      email: '',
      body: '',
    });

    setErrorName('');
    setErrorEmail('');
    setErrorBody('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      createComment(selectedPost.id, commentData).then(() => {
        commentData.body = '';
      });
    }
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
              'is-danger': errorName,
            })}
            value={commentData.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
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
              'is-danger': errorEmail,
            })}
            value={commentData.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
              'is-danger': errorBody,
            })}
            value={commentData.body}
            onChange={handleInputChange}
          />
        </div>

        {errorBody && (
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
              'is-loading': isSubmitting,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
