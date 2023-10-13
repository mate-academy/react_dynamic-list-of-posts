/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState } from 'react';
import { postCommentData } from '../api/posts';
import { Comment } from '../types/Comment';

interface Props {
  postId: number,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
}

type GenericObjectFields = {
  [key: string]: string,
};

type GenericObjectErrors = {
  [key: string]: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setPostComments = () => {},
  setErrorMessage = () => {},
}) => {
  const [loader, setLoader] = useState<boolean>(false);

  const [formComment, setFormComment] = useState<GenericObjectFields>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<GenericObjectErrors>({
    nameError: false,
    emailError: false,
    bodyError: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const resetFormAdd = () => {
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
    setLoader(true);

    try {
      const { name, email, body } = formComment;

      const newComment = {
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      };

      const serverComment = await postCommentData(newComment);

      setPostComments(prevComments => [...prevComments, serverComment]);

      resetFormAdd();
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const handleAddComment = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    let error = false;

    if (!formComment.name.trim()) {
      setFormErrors(prev => ({
        ...prev,
        nameError: true,
      }));

      error = true;
    }

    if (!formComment.email.trim()) {
      setFormErrors(prev => ({
        ...prev,
        emailError: true,
      }));

      error = true;
    }

    if (!formComment.body.trim()) {
      setFormErrors(prev => ({
        ...prev,
        bodyError: true,
      }));

      error = true;
    }

    if (error) {
      return;
    }

    addNewComment();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
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

          {
            formErrors.nameError && (
              <>
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger" data-cy="ErrorMessage">
                  Name is required
                </p>
              </>
            )
          }

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

          {
            formErrors.emailError && (
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
            )
          }
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
            className={classNames('input', {
              'is-danger': formErrors.bodyError,
            })}
            value={formComment.body}
            onChange={handleChange}
          />
        </div>

        {
          formErrors.bodyError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )
        }
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
