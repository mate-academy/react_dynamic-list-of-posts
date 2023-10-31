import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

type FormFields = {
  name: string;
  email: string;
  text: string;
};

type FormErrors = {
  isNameError: boolean;
  isEmailError: boolean;
  isTextError: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
}) => {
  const [formFields, setFormFields] = useState<FormFields>({
    name: '',
    email: '',
    text: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    isNameError: false,
    isEmailError: false,
    isTextError: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addComment = useCallback(async (
    email: string,
    body: string,
    name: string,
    commentPostId: number,
  ) => {
    const newComment: Omit<Comment, 'id'> = {
      email,
      body,
      name,
      postId: commentPostId,
    };

    return createComment(newComment)
      .then(currComment => {
        setComments(
          (currentComments: Comment[]) => [
            ...currentComments,
            currComment,
          ],
        );
      })
      .catch((error) => {
        throw error;
      });
  }, [setComments]);

  const OnSumbmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formFields.name.trim()) {
      setFormErrors(currValue => ({ ...currValue, isNameError: true }));
    }

    if (!formFields.email.trim()) {
      setFormErrors(currValue => ({ ...currValue, isEmailError: true }));
    }

    if (!formFields.text.trim()) {
      setFormErrors(currValue => ({ ...currValue, isTextError: true }));
    }

    if (!formFields.name.trim() 
    || !formFields.email.trim() 
    || !formFields.text.trim()
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await addComment(
        formFields.name,
        formFields.email,
        formFields.text,
        postId,
      );
    } finally {
      setIsLoading(false);
      setFormFields(currFields => ({
        ...currFields,
        text: '',
      }));
    }
  };

  const changNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(currFields => ({
      ...currFields,
      name: e.target.value,
    }));

    if (e.target.value.trim()) {
      setFormErrors(currValue => ({ ...currValue, isNameError: false }));
    }
  };

  const changEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields(currFields => ({
      ...currFields,
      email: e.target.value,
    }));

    if (e.target.value.trim()) {
      setFormErrors(currValue => ({ ...currValue, isEmailError: false }));
    }
  };

  const changTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormFields(currFields => ({
      ...currFields,
      text: e.target.value,
    }));

    if (e.target.value.trim()) {
      setFormErrors(currValue => ({ ...currValue, isTextError: false }));
    }
  };

  const resetFields = () => {
    setFormFields({
      name: '',
      email: '',
      text: '',
    });

    setFormErrors({
      isNameError: false,
      isEmailError: false,
      isTextError: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={OnSumbmitHandler}>
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
              'is-danger': formErrors.isNameError,
            })}
            value={formFields.name}
            onChange={changNameHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.isNameError && (
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
            className={classNames('input', {
              'is-danger': formErrors.isEmailError,
            })}
            value={formFields.email}
            onChange={changEmailHandler}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.isEmailError && (
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
            className={classNames('textarea', {
              'is-danger': formErrors.isTextError,
            })}
            value={formFields.text}
            onChange={changTextHandler}
          />
        </div>

        {formErrors.isTextError && (
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
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={resetFields}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
