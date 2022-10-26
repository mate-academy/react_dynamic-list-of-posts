import classnames from 'classnames';
import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import { CommentData } from '../types/Comment';
import { ErrorMessages } from '../types/ErrorMessages';

type Props = {
  onAddComment: (newComment: CommentData) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [
    newComment,
    setNewComment,
  ] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    body: false,
    general: false,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setIsError(prev => {
      return {
        ...prev,
        [name]: false,
      };
    });

    setNewComment(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkInputs = () => {
    setIsError({
      name: false,
      email: false,
      body: false,
      general: false,
    });

    const { name, email, body } = newComment;
    let isErrorLocal = false;

    if (!name) {
      setIsError(prev => {
        return {
          ...prev,
          name: true,
        };
      });

      isErrorLocal = true;
    }

    if (!email) {
      setIsError(prev => {
        return {
          ...prev,
          email: true,
        };
      });

      isErrorLocal = true;
    }

    if (!body) {
      setIsError(prev => {
        return {
          ...prev,
          body: true,
        };
      });

      isErrorLocal = true;
    }

    return isErrorLocal;
  };

  const handleAddComment = async (event: FormEvent) => {
    event.preventDefault();

    if (!checkInputs()) {
      setIsLoading(true);
      try {
        onAddComment(newComment);

        setNewComment(prev => {
          return {
            ...prev,
            body: '',
          };
        });
      } catch {
        setIsError(prev => {
          return {
            ...prev,
            general: true,
          };
        });
      }

      setIsLoading(false);
    }
  };

  const handleResetForm = () => {
    setNewComment({
      name: '',
      email: '',
      body: '',
    });

    setIsError({
      name: false,
      email: false,
      body: false,
      general: false,
    });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
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
            className={
              classnames(
                'input',
                { 'is-danger': isError.name },
              )
            }
            value={newComment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.name}
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
            className={classnames(
              'input',
              { 'is-danger': isError.email },
            )}
            value={newComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.email}
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
            className={
              classnames(
                'textarea',
                { 'is-danger': isError.body },
              )
            }
            value={newComment.body}
            onChange={handleChange}
          />
        </div>

        {isError.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              classnames(
                'button',
                'is-link',
                { 'is-loading': isLoading },
              )
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => handleResetForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
