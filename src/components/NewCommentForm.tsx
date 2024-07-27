import React, { FormEvent, useState } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedUserPost: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: (error: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedUserPost,
  setComments,
  setError,
}) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCommentText, setFormCommentText] = useState('');
  const [errorFormName, setErrorFormName] = useState(false);
  const [errorFormEmail, setErrorFormEmail] = useState(false);
  const [errorFormCommentText, setErrorFormCommentText] = useState(false);
  const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState(false);

  const handleReset = () => {
    setFormName('');
    setFormEmail('');
    setFormCommentText('');
    setErrorFormName(false);
    setErrorFormEmail(false);
    setErrorFormCommentText(false);
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormEmail(event.target.value);
  };

  const handleCommentTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormCommentText(event.target.value);
  };

  const handleAddNewComment = (event: FormEvent) => {
    event.preventDefault();

    setErrorFormName(false);
    setErrorFormEmail(false);
    setErrorFormCommentText(false);

    const normalizeName = formName.trim();
    const normalizeEmail = formEmail.trim();
    const normalizeCommentText = formCommentText.trim();

    if (!normalizeName) {
      setErrorFormName(true);
    }

    if (!normalizeEmail) {
      setErrorFormEmail(true);
    }

    if (!normalizeCommentText) {
      setErrorFormCommentText(true);
    }

    // Перевірка чи є помилки і вихід, якщо є
    if (errorFormName || errorFormEmail || errorFormCommentText) {
      return;
    }

    setIsLoadingSubmitForm(true);
    const postId = selectedUserPost.id;

    createComment({
      postId,
      name: formName,
      email: formEmail,
      body: formCommentText,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setFormCommentText('');
      })
      .catch(() => {
        setError('Unable to write a comment');
      })
      .finally(() => {
        setIsLoadingSubmitForm(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddNewComment}>
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
            className={cn('input', { 'is-danger': errorFormName })}
            value={formName}
            onChange={handleNameInput}
            data-cy="nameInput" // Додаємо атрибут для тесту
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorFormName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorFormName && (
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
            className={cn('input', { 'is-danger': errorFormEmail })}
            value={formEmail}
            onChange={handleEmailInput}
            data-cy="emailInput" // Додаємо атрибут для тесту
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorFormEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorFormEmail && (
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
            className={cn('textarea', {
              'is-danger': errorFormCommentText,
            })}
            value={formCommentText}
            onChange={handleCommentTextArea}
            data-cy="bodyArea" // Додаємо атрибут для тесту
          />
        </div>

        {errorFormCommentText && (
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
              'is-loading': isLoadingSubmitForm,
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
            onClick={handleReset}
            data-cy="resetButton" // Додаємо атрибут для тесту
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
