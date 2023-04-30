import React, { useState } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../types/ErrorType';
import { createComment } from '../api/comments';
import { CommentType } from '../types/CommentType';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const validateForm = () => {
    let noErrorsPresent = true;

    if (!name.trim()) {
      setErrors(prevState => [...prevState, ErrorType.NAME]);
      noErrorsPresent = false;
    }

    if (!email.trim()) {
      setErrors(prevState => [...prevState, ErrorType.EMAIL]);
      noErrorsPresent = false;
    }

    if (!text.trim()) {
      setErrors(prevState => [...prevState, ErrorType.TEXT]);
      noErrorsPresent = false;
    }

    return noErrorsPresent;
  };

  const addComment = async () => {
    if (!selectedPost) {
      return;
    }

    try {
      setIsLoading(true);
      const newCommentData = {
        postId: selectedPost.id,
        name,
        email,
        body: text,
      };

      const newComment = await createComment(newCommentData);

      setComments(prevState => {
        return [
          ...prevState, newComment,
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputOnChange = (inputType: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    switch (inputType) {
      case 'name':
        setName(event.target.value);
        setErrors(prevState => prevState.filter(
          error => error !== ErrorType.NAME,
        ));
        break;
      case 'email':
        setEmail(event.target.value);
        setErrors(prevState => prevState.filter(
          error => error !== ErrorType.EMAIL,
        ));
        break;
      default:
        break;
    }
  };

  const handleTextAreaOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(event.target.value);
    setErrors(prevState => prevState.filter(
      error => error !== ErrorType.TEXT,
    ));
  };

  const handleClearButton = () => {
    setText('');
    setName('');
    setEmail('');
    setErrors([]);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    addComment();
    setText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleOnSubmit}>
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
            className={classNames('input', {
              'is-danger': errors.includes(ErrorType.NAME),
            })}
            value={name}
            onChange={handleInputOnChange('name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.includes(ErrorType.NAME) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.includes(ErrorType.NAME) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorType.NAME}
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
            className={classNames('input', {
              'is-danger': errors.includes(ErrorType.EMAIL),
            })}
            value={email}
            onChange={handleInputOnChange('email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.includes(ErrorType.EMAIL) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.includes(ErrorType.EMAIL) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorType.EMAIL}
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
            className={classNames('textarea', {
              'is-danger': errors.includes(ErrorType.TEXT),
            })}
            value={text}
            onChange={handleTextAreaOnChange}
          />
        </div>

        {errors.includes(ErrorType.TEXT) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorType.TEXT}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
