import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  handleCommentAddition: (newComment: Comment) => void;
};

const defaultFieldsStatus = {
  hasName: true,
  hasEmail: true,
  hasComment: true,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  handleCommentAddition,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [hasInputValues, setHasInputValues] = useState(defaultFieldsStatus);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setHasInputValues(prevState => ({
          ...prevState,
          hasName: true,
        }));
        setNameValue(value);
        break;

      case 'email':
        setHasInputValues(prevState => ({
          ...prevState,
          hasEmail: true,
        }));
        setEmailValue(value);
        break;

      case 'body':
        setHasInputValues(prevState => ({
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
      setIsFormLoading(true);
      setIsLoadingError(false);

      const addedComment = await postComment({
        postId,
        name: nameValue,
        email: emailValue,
        body: commentValue,
      });

      handleCommentAddition(addedComment);
      setCommentValue('');
      setIsFormLoading(false);
    } catch (error) {
      setIsLoadingError(true);
      setIsFormLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nameValue || !emailValue || !commentValue) {
      setHasInputValues(() => ({
        hasName: !!nameValue,
        hasEmail: !!emailValue.length,
        hasComment: !!commentValue.length,
      }));

      return;
    }

    addNewComment();
  };

  const handleFormClear = () => {
    setNameValue('');
    setEmailValue('');
    setCommentValue('');
    setHasInputValues(defaultFieldsStatus);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              { 'is-danger': !hasInputValues.hasName },
            )}
            value={nameValue}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(!hasInputValues.hasName) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(!hasInputValues.hasName) && (
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
            className={classNames(
              'input',
              { 'is-danger': !hasInputValues.hasEmail },
            )}
            value={emailValue}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(!hasInputValues.hasEmail) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(!hasInputValues.hasEmail) && (
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
            className={classNames(
              'textarea',
              { 'is-danger': !hasInputValues.hasComment },
            )}
            value={commentValue}
            onChange={handleInputChange}
          />
        </div>

        {(!hasInputValues.hasComment) && (
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
              'button',
              'is-link',
              { 'is-loading': isFormLoading },
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
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>

      {isLoadingError && (
        <div
          className="notification is-danger"
        >
          Unable to add the comment!
        </div>
      )}
    </form>
  );
};
