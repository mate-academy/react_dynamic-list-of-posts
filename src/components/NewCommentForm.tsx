import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { createComment } from '../api/posts';

type Props = {
  selectedPost: Post | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setCommentErrorMessage: (value: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  setComments, selectedPost, setCommentErrorMessage,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [formError, setFormError] = useState({
    name: '',
    email: '',
    text: '',
  });

  const isEmptyField = !commentText.length
    || !commentEmail.length
    || !commentName.length;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentName(event.target.value);
    setFormError({
      ...formError,
      name: '',
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentEmail(event.target.value);
    setFormError({
      ...formError,
      email: '',
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
    setFormError({
      ...formError,
      text: '',
    });
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentName) {
      setFormError(rest => ({
        ...rest,
        name: 'Name is required',
      }));
    }

    if (!commentEmail) {
      setFormError(rest => ({
        ...rest,
        email: 'Email is required',
      }));
    }

    if (!commentText) {
      setFormError(rest => ({
        ...rest,
        text: 'Enter some text',
      }));
    }

    if (selectedPost?.id && !isEmptyField) {
      setIsFormLoading(true);

      createComment({
        postId: selectedPost?.id,
        name: commentName.trim(),
        email: commentEmail.trim(),
        body: commentText.trim(),
      })
        .then(newComment => {
          setComments(currentComments => [...currentComments, newComment]);
        })
        .catch(() => {
          setCommentErrorMessage(true);
        })
        .finally(() => {
          setCommentText('');
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

    setCommentEmail('');
    setCommentName('');
    setCommentText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
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
            className={classNames('input', { 'is-danger': formError.name })}
            value={commentName}
            onChange={handleNameChange}
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
            {formError.name}
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
            className={classNames('input', { 'is-danger': formError.email })}
            value={commentEmail}
            onChange={handleEmailChange}
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
            {formError.email}
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
            className={classNames('textarea', { 'is-danger': formError.text })}
            value={commentText}
            onChange={handleTextChange}
          />
        </div>

        {formError.text && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formError.text}
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
