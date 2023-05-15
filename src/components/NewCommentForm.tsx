import React, { useState, useCallback } from 'react';
import { FORM_FIELDS } from '../utils/constants';
import { FormFieldsNames } from '../types/FormField';
import { postComment } from '../api/client';
import { Post } from '../types/Post';
import { formatComments } from '../utils/formatData';
import { Comment } from '../types/Comment';
import { CommentResponse } from '../types/CommentResponse';

type Props = {
  selectedPost: Post,
  setNewComment: (comment: Comment) => void,
  setIsCommentsError: (value: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setNewComment,
  setIsCommentsError,
}) => {
  const initialState = {
    formFields: {
      name: '',
      email: '',
      body: '',
    },
    formErrors: {
      name: false,
      email: false,
      body: false,
    },
  };

  const [formFields, setFormFields] = useState(initialState.formFields);
  const [formErrors, setFormErrors] = useState(initialState.formErrors);
  const [isLoading, setIsLoading] = useState(false);

  const showError = useCallback((key: FormFieldsNames) => {
    formErrors[key] = true;
    setFormErrors(prev => ({ ...prev, ...formErrors }));
  }, []);

  const validateForm = () => {
    for (const [key, value] of Object.entries(formFields)) {
      if (!value.length) {
        showError(key.toString() as FormFieldsNames);
      }
    }
  };

  const onFieldChange = (
    { value, name }: EventTarget & HTMLInputElement | HTMLTextAreaElement,
  ) => {
    setFormErrors(prev => ({ ...prev, [name]: false }));
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    setIsCommentsError(false);
    if (Object.values(formErrors).every(item => !item)) {
      setIsLoading(true);
      postComment({ postId: selectedPost.id, ...formFields })
        .then((res) => {
          setFormFields(prev => ({ ...prev, body: '' }));
          setNewComment(formatComments([res as CommentResponse])[0]);
        })
        .catch(() => {
          setIsCommentsError(true);
          setFormErrors(initialState.formErrors);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onFormSubmit}
    >
      {FORM_FIELDS.map((field) => (
        <div
          key={field.name}
          className="field"
          data-cy={`${field.name.charAt(0).toLocaleUpperCase() + field.name.slice(1)}Field`}
        >
          <label className="label" htmlFor={field.id}>
            {field.label}
          </label>

          <div className="control has-icons-left has-icons-right">
            {field.name !== 'body' ? (
              <input
                type="text"
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                className={`input${formErrors[field.name] ? ' is-danger' : ''}`}
                value={formFields[field.name]}
                onChange={(e) => onFieldChange(e.target)}
              />
            )
              : (
                <textarea
                  name={field.name}
                  id={field.id}
                  placeholder={field.placeholder}
                  className={`textarea${formErrors[field.name] ? ' is-danger' : ''}`}
                  value={formFields[field.name]}
                  onChange={(e) => onFieldChange(e.target)}
                />
              )}

            <span className="icon is-small is-left">
              <i className={`fas ${field.icon}`} />
            </span>

            {formErrors[field.name] && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {formErrors[field.name] && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {`${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`}
            </p>
          )}
        </div>
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link${isLoading ? ' is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setFormErrors(initialState.formErrors);
              setFormFields(initialState.formFields);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
