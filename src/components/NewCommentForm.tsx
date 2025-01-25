import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { validateEmail } from '../utils/validations';

interface Props {
  selectedPostId: number;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  setError: (error: string) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  comments,
  setComments,
  setError,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    body: '',
  } as CommentData);
  const [inputErrors, setInputErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (inputErrors[name as keyof CommentData]) {
      setInputErrors(prevInputErrors => ({
        ...prevInputErrors,
        [name]: false,
      }));
    }

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleEmailBlur = () => {
    if (!validateEmail(inputs.email)) {
      setInputErrors(prevInputErrors => ({
        ...prevInputErrors,
        email: true,
      }));
    }
  };

  const clearInputs = (clearAll = false) => {
    setInputs(prevInputs => ({
      name: clearAll ? '' : prevInputs.name,
      email: clearAll ? '' : prevInputs.email,
      body: '',
    }));

    setInputErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      name: !inputs.name.trim(),
      email: !validateEmail(inputs.email),
      body: !inputs.body.trim(),
    };

    setInputErrors(errors);

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    const newComment = {
      ...inputs,
      postId: selectedPostId,
    };

    try {
      setIsFormLoading(true);
      setError('');

      const commentResponse = await client.post<Comment>(
        '/comments',
        newComment,
      );

      setComments([...comments, commentResponse]);

      clearInputs();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to create comment',
      );
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={inputs.name}
            onChange={handleInputsChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': inputErrors.name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': inputErrors.name,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {inputErrors.name && (
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
            value={inputs.email}
            onChange={handleInputsChange}
            onBlur={handleEmailBlur}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': inputErrors.email,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': inputErrors.email,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {inputErrors.email && (
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
            value={inputs.body}
            onChange={handleInputsChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': inputErrors.body,
            })}
          />
        </div>

        {inputErrors.body && (
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
              'is-loading': isFormLoading,
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
            onClick={() => clearInputs(true)}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
