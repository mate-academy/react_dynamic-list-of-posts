import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { postComments } from '../../utils/commentsApi';

export const IconError: React.FC = () => (
  <span
    className="icon is-small is-right has-text-danger"
    data-cy="ErrorIcon"
  >
    <i className="fas fa-exclamation-triangle" />
  </span>
);

export const ErrorMessage: React.FC<{ title: string }> = ({ title }) => (
  <p className="help is-danger" data-cy="ErrorMessage">
    {title}
  </p>
);

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

const fieldStatus = {
  hasName: true,
  hasEmail: true,
  hasComment: true,
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasInputValue, setHasInputValue] = useState(fieldStatus);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setHasInputValue(prevState => ({
          ...prevState,
          hasName: true,
        }));
        setNameValue(value);
        break;

      case 'email':
        setHasInputValue(prevState => ({
          ...prevState,
          hasEmail: true,
        }));
        setEmailValue(value);
        break;

      case 'body':
        setHasInputValue(prevState => ({
          ...prevState,
          hasComment: true,
        }));
        setCommentValue(value);
        break;

      default:
        break;
    }
  };

  const addNewComment = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const addedComment = await postComments({
        postId,
        name: nameValue,
        email: emailValue,
        body: commentValue,
      });

      onAddComment(addedComment);
      setIsLoading(false);
      setCommentValue('');
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nameValue || !emailValue || !commentValue) {
      setHasInputValue(() => ({
        hasName: !!nameValue,
        hasEmail: !!emailValue.length,
        hasComment: !!commentValue.length,
      }));

      return;
    }

    addNewComment();
  };

  const handleClearForm = () => {
    setNameValue('');
    setEmailValue('');
    setCommentValue('');
    setHasInputValue(fieldStatus);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            className={classNames(
              'input',
              { 'is-danger': !hasInputValue.hasName },
            )}
            value={nameValue}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {!hasInputValue.hasName && <IconError />}
        </div>
        {!hasInputValue.hasName && <ErrorMessage title="Name is required" />}

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
            className={classNames(
              'input',
              { 'is-danger': !hasInputValue.hasEmail },
            )}
            value={emailValue}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {!hasInputValue.hasEmail && <IconError />}
        </div>
        {!hasInputValue.hasEmail && <ErrorMessage title="Email is required" />}
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
            className={classNames(
              'input',
              { 'is-danger': !hasInputValue.hasComment },
            )}
            value={commentValue}
            onChange={handleInputChange}
          />
        </div>
        {!hasInputValue.hasComment && <ErrorMessage title="Enter some text" />}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>

        {hasError && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Unable to add a new comment. Try again!
          </div>
        )}
      </div>
    </form>
  );
};
