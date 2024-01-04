import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodoContext';
import { addComment } from '../utils/api';
import { Comment } from '../types/Comment';

interface Props {
  comments: Comment[];
  setComments: (q: Comment[]) => void;
}

export const NewCommentForm: React.FC<Props> = ({ comments, setComments }) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(TodosContext);

  const { selectedPost } = context;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentName(event.target.value);
    setIsNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
    setIsTextError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!commentName.trim()) {
      setIsNameError(true);
    }

    if (!commentEmail.trim()) {
      setIsEmailError(true);
    }

    if (!commentText.trim()) {
      setIsTextError(true);
    }

    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) {
      return;
    }

    setIsNameError(false);
    setIsEmailError(false);
    setIsTextError(false);
    setIsLoading(true);

    const newComment = {
      postId: selectedPost ? selectedPost.id : 0,
      name: commentName,
      email: commentEmail,
      body: commentText,
    };

    addComment(newComment)
      .then((res) => {
        setComments([...comments, res]);
        setCommentText('');
      })
      .catch(() => {
        setIsResponseError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleClear = () => {
    setIsLoading(false);
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsTextError(false);
    setIsResponseError(false);
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
            className={cn('input', {
              'is-danger': isNameError,
            })}
            value={commentName}
            onChange={handleNameChange}
          />

          {isNameError && (
            <>
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {isNameError && (
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
            className={cn('input', {
              'is-danger': isEmailError,
            })}
            value={commentEmail}
            onChange={handleEmailChange}
          />

          {isEmailError && (
            <>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
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
            className={cn('textarea', {
              'is-danger': isTextError,
            })}
            value={commentText}
            onChange={handleTextChange}
          />
        </div>

        {isTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {isResponseError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Can&apos;t add a comment.
        </p>
      )}
    </form>
  );
};
