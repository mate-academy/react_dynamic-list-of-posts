import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPost,
    newComment,
    setComments,
    setIsAddDeleteCommentError,
  } = useContext(AppContext);

  const [author, setAuthor] = useState('');
  const [isAuthorError, setIsAuthorError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommentTextError, setIsCommentTextError] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const resetForm = () => {
    setAuthor('');
    setEmail('');
    setCommentText('');

    setIsAuthorError(false);
    setIsEmailError(false);
    setIsCommentTextError(false);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsAddDeleteCommentError(false);

    if (selectedPost) {
      if (!author.trim()) {
        setIsAuthorError(true);
      }

      if (!email.trim()) {
        setIsEmailError(true);
      }

      if (!commentText.trim()) {
        setIsCommentTextError(true);
      }

      if (author.trim() && email.trim() && commentText.trim()) {
        setIsPostingComment(true);

        const commentData: Omit<Comment, 'id'> = {
          postId: selectedPost.id,
          name: author.trim(),
          email: email.trim(),
          body: commentText.trim(),
        };

        newComment(commentData)
          .then((responseComment: Comment) => {
            setComments((previousComments: Comment[] | null) => {
              if (!previousComments) {
                return [responseComment];
              }

              return [...previousComments, responseComment];
            });

            setCommentText('');
          })
          .catch(() => setIsAddDeleteCommentError(true))
          .finally(() => setIsPostingComment(false));
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleCommentSubmit}>
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
              'is-danger': isAuthorError,
            })}
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setIsAuthorError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isAuthorError && (
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
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
              'is-danger': isCommentTextError,
            })}
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              setIsCommentTextError(false);
            }}
          />
        </div>

        {isCommentTextError && (
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
              'is-loading': isPostingComment,
            })}
            disabled={isPostingComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => resetForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
