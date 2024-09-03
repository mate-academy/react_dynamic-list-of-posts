import React, { Dispatch, FC, SetStateAction } from 'react';
import { MessageType } from '../enums/MistakesMessages';
import classNames from 'classnames';
import { usePostsContext } from '../context/PostsContext';
import { useAddComment } from '../hooks/useAddComment';
import { Comment } from '../types/Comment';

interface Props {
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm: FC<Props> = ({ setComments }) => {
  const { activePost } = usePostsContext();
  const { addComment, isAddingLoading } = useAddComment({ setComments });
  const [authorName, setAuthorName] = React.useState('');
  const [authorEmail, setAuthorEmail] = React.useState('');
  const [commentText, setCommentText] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<MessageType[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case 'authorName':
        setAuthorName(value);
        break;
      case 'authorEmail':
        setAuthorEmail(value);
        break;
      case 'commentText':
        setCommentText(value);
        break;
      default:
        break;
    }

    setErrorMessage(prevErrors => {
      if (name === 'authorName' && value.trim()) {
        return prevErrors.filter(error => error !== MessageType.name);
      }

      if (name === 'authorEmail' && value.trim()) {
        return prevErrors.filter(error => error !== MessageType.email);
      }

      if (name === 'commentText' && value.trim()) {
        return prevErrors.filter(error => error !== MessageType.text);
      }

      return prevErrors;
    });
  };

  const validateForm = () => {
    const errors: MessageType[] = [];

    if (!authorName.trim()) {
      errors.push(MessageType.name);
    }

    if (!authorEmail.trim()) {
      errors.push(MessageType.email);
    }

    if (!commentText.trim()) {
      errors.push(MessageType.text);
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      setErrorMessage(errors);

      return;
    }

    addComment({
      name: authorName,
      postId: activePost?.id as number,
      email: authorEmail,
      body: commentText,
    });

    setCommentText('');
  };

  const reset = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setErrorMessage([]);
  };

  const isError = (error: MessageType) => errorMessage.includes(error);

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="authorName"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': isError(MessageType.name),
            })}
            value={authorName}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isError(MessageType.name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError(MessageType.name) && (
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
            name="authorEmail"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isError(MessageType.email),
            })}
            value={authorEmail}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isError(MessageType.email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isError(MessageType.email) && (
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
            name="commentText"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': isError(MessageType.text),
            })}
            value={commentText}
            onChange={handleChange}
          />
        </div>

        {isError(MessageType.text) && (
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
              'is-loading': isAddingLoading,
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
