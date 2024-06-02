/* eslint-disable @typescript-eslint/no-shadow */
import React, { ChangeEvent, useEffect, useState } from 'react';
import * as Services from '../utils/fetchClient';
import { Comment } from './../types/Comment';

type NewCommentFormProps = {
  isLoading: boolean;
  postId: number | undefined | null;
  onAddComment: (newComment: Comment) => void;
  setIsLoading: (isLoading: boolean) => void;
  isFormVisible: boolean;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  isLoading,
  postId,
  onAddComment,
  setIsLoading,
  isFormVisible,
}) => {
  const [authorNameLabel, setAuthorNameLabel] = useState('');
  const [emailLabel, setEmailLabel] = useState('');
  const [textLabel, setTextLabel] = useState('');

  const [isAuthorNameValid, setIsAuthorNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isTextValid, setIsTextValid] = useState(true);
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    setIsAuthorNameValid(true);
    setIsEmailValid(true);
    setIsTextValid(true);
    setSubmissionError('');
    setAuthorNameLabel('');
    setEmailLabel('');
    setTextLabel('');
  }, [postId]);

  const handleInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorNameLabel(event.target.value);
    setIsAuthorNameValid(true);
  };

  const handleInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailLabel(event.target.value);
    setIsEmailValid(true);
  };

  const handleInputText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextLabel(event.target.value);
    setIsTextValid(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = authorNameLabel !== '';
    const isEmailValid = emailLabel !== '';
    const isTextValid = textLabel !== '';

    setIsAuthorNameValid(isNameValid);
    setIsEmailValid(isEmailValid);
    setIsTextValid(isTextValid);

    if (!isNameValid || !isEmailValid || !isTextValid) {
      return;
    }

    setIsLoading(true);
    setSubmissionError('');

    const commentData = {
      postId,
      name: authorNameLabel,
      email: emailLabel,
      body: textLabel,
    };

    Services.client
      .post('/comments', commentData)
      .then(newComment => {
        onAddComment(newComment as Comment);
        setTextLabel('');
        setIsLoading(false);
      })
      .catch(() => {
        setSubmissionError('Failed to submit comment');
        setIsLoading(false);
      });
  };

  const handleClearButton = () => {
    setAuthorNameLabel('');
    setEmailLabel('');
    setTextLabel('');
    setIsAuthorNameValid(true);
    setIsEmailValid(true);
    setIsTextValid(true);
    setSubmissionError('');
  };

  return (
    <>
      {isFormVisible && (
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
                className={`input ${isAuthorNameValid ? '' : 'is-danger'}`}
                onChange={handleInputName}
                value={authorNameLabel}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {!isAuthorNameValid && (
                <>
                  <span
                    className={`icon is-small is-right ${isAuthorNameValid ? '' : 'has-text-danger'}`}
                    data-cy="ErrorIcon"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                  <p className="help is-danger" data-cy="ErrorMessage">
                    Name is required
                  </p>
                </>
              )}
            </div>
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
                onChange={handleInputEmail}
                className={`input ${isEmailValid ? '' : 'is-danger'}`}
                value={emailLabel}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              {!isEmailValid && (
                <>
                  <span
                    className="icon is-small is-right has-text-danger"
                    data-cy="ErrorIcon"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                  <p className="help is-danger" data-cy="ErrorMessage">
                    Email is required
                  </p>
                </>
              )}
            </div>
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
                onChange={handleInputText}
                className={`textarea ${isTextValid ? '' : 'is-danger'}`}
                value={textLabel}
              />
            </div>

            {!isTextValid && (
              <p className="help is-danger" data-cy="ErrorMessage">
                Enter some text
              </p>
            )}
          </div>

          {submissionError && (
            <p className="help is-danger" data-cy="SubmissionError">
              {submissionError}
            </p>
          )}

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className={`button is-link ${isLoading ? 'is-loading' : ''}`}
                disabled={isLoading}
              >
                Add
              </button>
            </div>

            <div className="control">
              <button
                type="reset"
                className="button is-link is-light"
                onClick={handleClearButton}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
