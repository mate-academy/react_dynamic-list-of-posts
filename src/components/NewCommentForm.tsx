import React, { useState } from 'react';
import classNames from 'classnames';
import { createComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setShowshowErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
};

type FormFields = {
  [key: string]: string,
};

type FormErrors = {
  [key: string]: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setPostComments = () => {},
  setShowshowErrorMessage = () => {},
}) => {
  const [loader, setIsLoading] = useState<boolean>(false);

  const [formComment, setFormComment] = useState<FormFields>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    nameError: false,
    emailError: false,
    bodyError: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormComment(prev => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors(prev => ({
      ...prev,
      [`${name}Error`]: false,
    }));
  };

  const resetFormClear = () => {
    setFormComment({
      name: '',
      email: '',
      body: '',
    });

    setFormErrors({
      nameError: false,
      emailError: false,
      bodyError: false,
    });
  };

  const resetForm = () => {
    setFormComment(prev => ({
      ...prev,
      name: '',
      email: '',
    }));

    setFormErrors(prev => ({
      ...prev,
      nameError: false,
      emailError: false,
    }));
  };

  const addNewComment = async () => {
    setIsLoading(true);

    try {
      const { name, email, body } = formComment;

      const newComment = await createComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setPostComments(prevComments => [...prevComments, newComment]);

      resetForm();
    } catch {
      setShowshowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!formComment.name.trim()) {
      setFormErrors(prev => ({
        ...prev,
        nameError: true,
      }));

      return;
    }

    if (!formComment.email.trim()) {
      setFormErrors(prev => ({
        ...prev,
        emailError: true,
      }));

      return;
    }

    if (!formComment.body.trim()) {
      setFormErrors(prev => ({
        ...prev,
        bodyError: true,
      }));

      return;
    }

    addNewComment();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
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
            className={classNames('input', {
              'is-danger': formErrors.nameError,
            })}
            value={formComment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.nameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="showErrorMessage">
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
            className={classNames('input', {
              'is-danger': formErrors.emailError,
            })}
            value={formComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.emailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger" data-cy="showErrorMessage">
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
            className={classNames('textarea', {
              'is-danger': formErrors.bodyError,
            })}
            value={formComment.body}
            onChange={handleChange}
          />
        </div>

        {formErrors.bodyError && (
          <p className="help is-danger" data-cy="showErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loader,
            })}
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
            onClick={resetFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
