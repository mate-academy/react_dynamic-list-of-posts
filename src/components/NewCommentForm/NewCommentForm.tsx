import React, { useState } from 'react';
import './NewCommentForm.scss';
import * as EmailValidator from 'email-validator';

enum FieldNames {
  name,
  body,
  email,
}

type Props = {
  handleAddComment: ({ name, email, body }: CommentBody) => void,
};

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const defaultErrorsObj = {
  [FieldNames.name]: false,
  [FieldNames.body]: false,
  [FieldNames.email]: false,
};

export const NewCommentForm: React.FC<Props> = ({ handleAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState(defaultErrorsObj);

  const isFormComplete = () => {
    const hasEmptyFields = [name, email, body].some(field => field === '');
    const hasErrors = Object.values(errors).some(error => error);

    return hasEmptyFields || hasErrors;
  };

  const validateField = (fieldName: FieldNames, value: string) => {
    let hasError = false;

    switch (fieldName) {
      case FieldNames.name:
      case FieldNames.body:
        hasError = value.replace(/ /g, '') === '';
        break;
      case FieldNames.email:
        hasError = !EmailValidator.validate(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [fieldName]: hasError,
    });
  };

  const handleInput = (fieldName: FieldNames, event: InputEvent) => {
    const { value } = event.target;

    switch (fieldName) {
      case FieldNames.name:
        setName(value);
        break;
      case FieldNames.email:
        setEmail(value);
        break;
      case FieldNames.body:
        setBody(value);
        break;
      default:
        break;
    }

    validateField(fieldName, value);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        handleAddComment({
          name,
          email,
          body,
        });
        clearForm();
      }}
      autoComplete="off"
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            handleInput(FieldNames.name, e);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>
      {errors[FieldNames.name] && (
        <span className="NewCommentForm__warning">
          Can&apos;t be empty
        </span>
      )}

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            handleInput(FieldNames.email, e);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>
      {errors[FieldNames.email] && (
        <span className="NewCommentForm__warning">
          Must be a valid email
        </span>
      )}

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(e) => {
            handleInput(FieldNames.body, e);
          }}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>
      {errors[FieldNames.body] && (
        <span className="NewCommentForm__warning">
          Can&apos;t be empty
        </span>
      )}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={isFormComplete()}
      >
        Add a comment
      </button>
    </form>
  );
};
