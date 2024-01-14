import React, { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { useCommentContext } from '../context/CommentContext';
import { Comment } from '../types/Comment';
import { useAppContext } from '../context/AppContext';

export const NewCommentForm: React.FC = () => {
  const { setComments } = useCommentContext();
  const { selectedPost: post } = useAppContext();

  const [showInputError, setShowInputError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showBodyError, setShowBodyError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [bodyValue, setBodyValue] = useState<string>('');
  const [commentIsPosting, setCommentIsPosting] = useState<boolean>(false);

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowInputError(false);
  };

  const handleChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    setShowEmailError(false);
  };

  const handleChangeBodyValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(event.target.value);
    setShowBodyError(false);
  };

  const handleClearErrors = () => {
    setShowInputError(false);
    setShowEmailError(false);
    setShowBodyError(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) {
      setShowInputError(true);
    }

    if (!emailValue) {
      setShowEmailError(true);
    }

    if (!bodyValue) {
      setShowBodyError(true);
    }

    if (!inputValue || !emailValue || !bodyValue) {
      return;
    }

    const postComment = async () => {
      const data = {
        postId: post?.id,
        name: inputValue,
        email: emailValue,
        body: bodyValue,
      };

      setCommentIsPosting(true);

      try {
        const response = await client.post('/comments', data);

        setComments(prev => [...prev, response] as Comment[]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setCommentIsPosting(false);
        setBodyValue('');
      }
    };

    postComment();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={inputValue}
            onChange={handleChangeInputValue}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': showInputError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {showInputError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showInputError && (
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
            value={emailValue}
            onChange={handleChangeEmailValue}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': showEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {showEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {showEmailError && (
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
            value={bodyValue}
            onChange={handleChangeBodyValue}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': showBodyError })}
          />
        </div>

        {showBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': commentIsPosting,
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
            onClick={handleClearErrors}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
