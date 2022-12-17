import classNames from 'classnames';
import React, { useState, useCallback } from 'react';
import { createComment } from '../api/comments';

type Props = {
  selectedUserPostId: number,
  // setAddComment: (load: boolean) => void,
  setIsLoadingComment: (load: boolean) => void,
  isLoadingComment: boolean,
  loadUserCommentsFromServer: () => void,
  setFailedToFetchComments: (loadData: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedUserPostId,
  setIsLoadingComment,
  isLoadingComment,
  loadUserCommentsFromServer,
  setFailedToFetchComments,
}) => {
  const [inputAuthorName, setInputAuthorName] = useState('');
  const [isEmptyInputAuthorName, setIsEmptyInputAuthorName] = useState(false);
  const [inputAuthorEmail, setInputAuthorEmail] = useState('');
  const [isEmptyInputAuthorEmail, setIsEmptyInputAuthorEmail] = useState(false);
  const [inputCommentText, setInputCommentText] = useState('');
  const [isEmptyInputCommentText, setIsEmptyInputCommentText] = useState(false);

  const loadCommentOnServer = useCallback(
    async (userPostId, authorName, authorEmail, commentText) => {
      try {
        setFailedToFetchComments(false);
        await createComment(
          userPostId,
          authorName,
          authorEmail,
          commentText,
        );
      } catch (error) {
        setFailedToFetchComments(true);
      } finally {
        loadUserCommentsFromServer();
      }
    }, [],
  );

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

  const handleAddComment = () => {
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
      setIsLoadingComment(true);
      setInputCommentText('');
      // setAddComment(true);
      loadCommentOnServer(
        selectedUserPostId, inputAuthorName, inputAuthorEmail, inputCommentText,
      );
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
      onSubmit={(event) => event.preventDefault()}
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
            onClick={handleAddComment}
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
