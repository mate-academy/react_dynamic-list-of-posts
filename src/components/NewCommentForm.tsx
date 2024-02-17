import React, { useState } from 'react';
import cn from 'classnames';
import { addComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number,
  addNewComment: (v: Comment) => void,

};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  addNewComment,
}) => {
  const [isSendingComment, setIsSendingComment] = useState(false);

  const [author, setAuthor] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const formSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (author.name.trim() === '') {
      setError(prev => ({
        ...prev,
        name: 'Name is required',
      }));
    }

    if (author.email.trim() === '') {
      setError(prev => ({
        ...prev,
        email: 'Email is required',
      }));
    }

    if (author.comment.trim() === '') {
      setError(prev => ({
        ...prev,
        comment: 'Enter some text',
      }));
    }

    if (author.name && author.email && author.comment !== '') {
      const newComment = {
        postId: selectedPostId,
        name: author.name.trim(),
        email: author.email.trim(),
        body: author.comment.trim(),
      };

      setIsSendingComment(true);
      addComments(newComment)
        .then(res => {
          addNewComment(res);
          setAuthor(prev => ({
            ...prev,
            comment: '',
          }));
        })
        .catch(() => {})
        .finally(() => setIsSendingComment(false));
    }
  };

  const handleAuthorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(prev => ({
      ...prev,
      name: '',
    }));
    setAuthor(prev => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleAuthorEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setError(prev => ({
      ...prev,
      email: '',
    }));
    setAuthor(prev => ({
      ...prev,
      email: event.target.value,
    }));
  };

  const handleAuthorCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setError(prev => ({
      ...prev,
      comment: '',
    }));
    setAuthor(prev => ({
      ...prev,
      comment: event.target.value,
    }));
  };

  const clearFormHandler = () => {
    const clearObj = {
      name: '',
      email: '',
      comment: '',
    };

    setAuthor(clearObj);
    setError(clearObj);
    setIsSendingComment(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={formSubmitHandler}>
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
              'is-danger': !!error.name.length,
            })}
            value={author.name}
            onChange={handleAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.name}
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
              'is-danger': !!error.email.length,
            })}
            value={author.email}
            onChange={handleAuthorEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.email}
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
              'is-danger': !!error.comment.length,
            })}
            value={author.comment}
            onChange={handleAuthorCommentChange}
          />
        </div>

        {error.comment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {error.comment}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link ', {
              'is-loading': isSendingComment,
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
            onClick={clearFormHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
