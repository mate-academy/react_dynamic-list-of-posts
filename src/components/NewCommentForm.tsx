import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { postComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post,
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ post, setComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
    postId: null,
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors(prev => ({ ...prev, [event.target.name]: false }));
  };

  const addComment = async () => {
    setIsLoading(true);
    try {
      const newCommentResponse = await postComment({
        name,
        email,
        body,
        postId: post.id,
      });

      if ('statusCode' in newCommentResponse) {
        setErrorMessage('There was an error. Please try again later.');
        clearError();
      } else {
        setComments(prev => [...prev, newCommentResponse]);
        setValues(prev => ({ ...prev, body: '' }));
      }
    } catch {
      setErrorMessage('error');
      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    addComment();
  };

  const handleReset = () => {
    setValues({
      name: '',
      email: '',
      body: '',
      postId: null,
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {errorMessage && !isLoading && (
        <div className="notification is-danger" data-cy="CommentsError">
          {errorMessage}
        </div>
      )}
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
              {
                'is-danger': errors.name,
              },
            )}
            value={name}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              {
                'is-danger': errors.email,
              },
            )}
            value={email}
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
              'textarea',
              {
                'is-danger': errors.body,
              },
            )}
            value={body}
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
              {
                'is-loading': isLoading,
              },
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
