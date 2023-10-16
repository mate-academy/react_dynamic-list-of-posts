import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../../services/comments';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentNameError, setCommentNameError] = useState(false);
  const [commentEmailError, setCommentEmailError] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonSubmit = (
    event: React.FormEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (commentName.trim() && commentEmail.trim() && commentText.trim()) {
      setIsLoading(true);

      const newComment = {
        id: 0,
        postId: selectedPost.id,
        name: commentName,
        email: commentEmail,
        body: commentText,
      };

      createComment(newComment)
        .then((createdComment) => {
          setComments(prevComments => [...prevComments, createdComment]);
          setCommentText('');
        })
        .finally(() => setIsLoading(false));
    }

    if (!commentName) {
      setCommentNameError(true);
    }

    if (!commentEmail) {
      setCommentEmailError(true);
    }

    if (!commentText) {
      setCommentTextError(true);
    }
  };

  const handleButtonReset = () => {
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setCommentNameError(false);
    setCommentEmailError(false);
    setCommentTextError(false);
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
            value={commentName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': commentNameError,
            })}
            onChange={(event) => {
              setCommentName(event.target.value);
              setCommentNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentNameError && (
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
            value={commentEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': commentEmailError,
            })}
            onChange={(event) => {
              setCommentEmail(event.target.value);
              setCommentEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentEmailError && (
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
            value={commentText}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': commentTextError,
            })}
            onChange={(event) => {
              setCommentText(event.target.value);
              setCommentTextError(false);
            }}
          />
        </div>

        {commentTextError && (
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
            onClick={(event) => handleButtonSubmit(event)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleButtonReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
