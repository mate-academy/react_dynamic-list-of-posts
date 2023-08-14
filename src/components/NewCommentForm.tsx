import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { PostContext } from './context/PostContext';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';
import { postComment } from '../api/comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null,
};

export const NewCommentForm: React.FC<Props> = ({ selectedPost }) => {
  const {
    setError,
    setComments,
    isLoading,
    setIsLoading,
  } = useContext(PostContext);

  const [authorName, setAuthorName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const handleAuthorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setAuthorName(e.target.value);
  };

  const handleAuthorEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setAuthorEmail(e.target.value);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsCommentError(false);
    setCommentText(e.target.value);
  };

  const handleSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!authorName) {
      setIsNameError(true);
    }

    if (!authorEmail) {
      setIsEmailError(true);
    }

    if (!commentText) {
      setIsCommentError(true);
    }

    if (!authorName || !authorEmail || !commentText) {
      return;
    }

    let newComment: Omit<Comment, 'id'>;

    try {
      if (selectedPost) {
        newComment = {
          postId: selectedPost?.id,
          name: authorName,
          email: authorEmail,
          body: commentText,
        };

        setIsLoading(true);
        await postComment(newComment);
        setComments(currentComments => [...currentComments,
          { ...newComment, id: +new Date() }]);
      }
    } catch {
      setError(Error.Load);
    } finally {
      setIsLoading(false);
    }

    setCommentText('');
  };

  const reset = () => {
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);

    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
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
            className={cn('input', {
              'is-danger': isNameError,
            })}
            value={authorName}
            onChange={(e) => handleAuthorName(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {isNameError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
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
            className={cn('input', {
              'is-danger': isEmailError,
            })}
            value={authorEmail}
            onChange={(e) => handleAuthorEmail(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {isEmailError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
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
            className={cn('textarea', {
              'is-danger': isCommentError,
            })}
            value={commentText}
            onChange={(e) => handleCommentText(e)}
          />
        </div>

        {isCommentError
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              Enter some text
            </p>
          )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoading,
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
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
