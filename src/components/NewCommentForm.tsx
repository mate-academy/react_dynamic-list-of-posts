import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api/Comments';
import { PostContext } from '../PostContext';
import { CommentsContext } from '../CommentsContext';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [isBodyError, setIsBodyError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedPost } = useContext(PostContext);
  const {
    comments,
    setComments,
    setIsCommentDeleteError,
    setIsCommentUpdateError,
  } = useContext(CommentsContext);

  const reset = () => {
    setName('');
    setIsNameError(false);
    setEmail('');
    setIsEmailError(false);
    setBody('');
    setIsBodyError(false);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsCommentDeleteError(false);
    setIsCommentUpdateError(false);

    if (!name.trim()) {
      setIsNameError(true);
    }

    if (!email.trim()) {
      setIsEmailError(true);
    }

    if (!body.trim()) {
      setIsBodyError(true);
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);

    if (selectedPost) {
      addComment(selectedPost.id, {
        name,
        email,
        body,
      })
        .then(newComment => {
          setComments([...comments, newComment]);
        })
        .catch((err) => {
          setIsCommentUpdateError(true);
          throw (err);
        })
        .then(() => {
          setBody('');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value);
    setIsNameError(false);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleBodyInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody(event.target.value);
    setIsBodyError(false);
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
            className={cn('input', {
              'is-danger': isNameError,
            })}
            value={name}
            onChange={handleNameInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={handleEmailInputChange}

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
            className={cn('input', {
              'is-danger': isBodyError,
            })}
            value={body}
            onChange={handleBodyInputChange}

          />
        </div>

        {isBodyError && (
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
