import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  selectedUserPostId: number,
  isLoadingComment: boolean,
  loadCommentOnServer: (comment: CommentData) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedUserPostId,
  isLoadingComment,
  loadCommentOnServer,
}) => {
  const [inputAuthorName, setInputAuthorName] = useState('');
  const [isEmptyInputAuthorName, setIsEmptyInputAuthorName] = useState(false);
  const [inputAuthorEmail, setInputAuthorEmail] = useState('');
  const [isEmptyInputAuthorEmail, setIsEmptyInputAuthorEmail] = useState(false);
  const [inputCommentText, setInputCommentText] = useState('');
  const [isEmptyInputCommentText, setIsEmptyInputCommentText] = useState(false);

  const handleChangeAutorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputAuthorName(event.target.value);
    if (event.target.value) {
      setIsEmptyInputAuthorName(false);
    }
  };

  const handleChangeAutorEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputAuthorEmail(event.target.value);
    if (event.target.value) {
      setIsEmptyInputAuthorEmail(false);
    }
  };

  const handleChangeCommentText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputCommentText(event.target.value);
    if (event.target.value) {
      setIsEmptyInputCommentText(false);
    }
  };

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAllDataFilled = selectedUserPostId && inputAuthorName
      && inputAuthorEmail && inputCommentText;

    if (!inputAuthorName) {
      setIsEmptyInputAuthorName(true);
    }

    if (!inputAuthorEmail) {
      setIsEmptyInputAuthorEmail(true);
    }

    if (!inputCommentText) {
      setIsEmptyInputCommentText(true);
    }

    if (isAllDataFilled) {
      loadCommentOnServer({
        postId: selectedUserPostId,
        name: inputAuthorName,
        email: inputAuthorEmail,
        body: inputCommentText,
      });
      setInputCommentText('');
    }
  };

  const handleClearCommentData = () => {
    setInputAuthorName('');
    setInputAuthorEmail('');
    setInputCommentText('');
    setIsEmptyInputAuthorName(false);
    setIsEmptyInputAuthorEmail(false);
    setIsEmptyInputCommentText(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleAddComment(event)}
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
            value={inputAuthorName}
            className={classNames('input', {
              'is-danger': isEmptyInputAuthorName,
            })}
            onChange={(event) => handleChangeAutorName(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isEmptyInputAuthorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmptyInputAuthorName && (
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
            value={inputAuthorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': isEmptyInputAuthorEmail,
            })}
            onChange={(event) => handleChangeAutorEmail(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmptyInputAuthorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmptyInputAuthorEmail && (
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
            value={inputCommentText}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': isEmptyInputCommentText,
            })}
            onChange={(event) => handleChangeCommentText(event)}
          />
        </div>

        {isEmptyInputCommentText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoadingComment },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearCommentData}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
