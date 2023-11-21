import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/comments';
import { ListContext } from './ListContext';

export const NewCommentForm: React.FC = () => {
  const {
    setIsCommentFormVisible,
    selectedPost,
    comments,
    setComments,
    setIsErrorComment,
  } = useContext(ListContext);

  const [authorNameValue, setAuthorNameValue] = useState('');
  const [authorEmailValue, setAuthorEmailValue] = useState('');
  const [authorCommentValue, setAuthorCommentValue] = useState('');

  const [isErrorNameValue, setIsErrorNameValue] = useState(false);
  const [isErrorEmailValue, setIsErrorEmailValue] = useState(false);
  const [isErrorCommentValue, setIsErrorCommentValue] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorNameValue(event.target.value);
    setIsErrorNameValue(false);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmailValue(event.target.value);
    setIsErrorEmailValue(false);
  };

  const handleInputComment
    = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAuthorCommentValue(event.target.value);
      setIsErrorCommentValue(false);
    };

  const handleReset = () => {
    setAuthorNameValue('');
    setAuthorEmailValue('');
    setAuthorCommentValue('');
  };

  const handleSubmit
    = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if (!authorNameValue.trim()) {
        setIsErrorNameValue(true);
      }

      if (!authorEmailValue.trim()) {
        setIsErrorEmailValue(true);
      }

      if (!authorCommentValue.trim()) {
        setIsErrorCommentValue(true);
      }

      if (authorNameValue.trim()
        && authorEmailValue.trim()
        && authorCommentValue.trim()) {
        setIsLoading(true);

        addComment({
          postId: selectedPost.id,
          name: authorNameValue,
          email: authorEmailValue,
          body: authorCommentValue,
        }).then((commentFromServer) => {
          setAuthorCommentValue('');
          setIsLoading(false);
          setComments([...comments, commentFromServer]);
        }).catch(() => {
          setIsErrorComment(true);
          handleReset();
          setIsCommentFormVisible(false);
        });
      }
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
            className={classNames('input', {
              'is-danger': isErrorNameValue,
            })}
            value={authorNameValue}
            onChange={handleInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorNameValue && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorNameValue && (
          <p className="help is-danger" data-cy="errorMessagePosts">
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
              'is-danger': isErrorEmailValue,
            })}
            value={authorEmailValue}
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmailValue && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorEmailValue && (
          <p className="help is-danger" data-cy="errorMessagePosts">
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
              'is-danger': isErrorCommentValue,
            })}
            value={authorCommentValue}
            onChange={handleInputComment}
          />
        </div>

        {isErrorCommentValue && (
          <p className="help is-danger" data-cy="errorMessagePosts">
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
