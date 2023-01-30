import React, { useState } from 'react';
import classNames from 'classnames';

import { FormErrors } from '../types/enums/Errors';
import { FormField } from '../types/FormField';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  activePost: Post,
  isFormLoading: boolean,
  postComment: (comment: Comment) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({
  activePost,
  isFormLoading,
  postComment,
}) => {
  const initialFormField = {
    content: '',
    error: false,
  };

  const errorFormField = {
    content: '',
    error: true,
  };

  const [name, setName] = useState<FormField>(initialFormField);
  const [email, setEmail] = useState<FormField>(initialFormField);
  const [body, setBody] = useState<FormField>(initialFormField);

  const handleInputContacts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    const updatedData = {
      content: inputValue,
      error: false,
    };

    switch (inputName) {
      case 'name':
        setName(updatedData);

        break;

      case 'email':
        setEmail(updatedData);
        break;

      default: break;
    }
  };

  const handleInputTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody({
      content: event.target.value,
      error: false,
    });
  };

  const resetFormFields = (event: React.FormEvent<Element>) => {
    event.preventDefault();

    setName(initialFormField);
    setEmail(initialFormField);
    setBody(initialFormField);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.content) {
      setName(errorFormField);
    }

    if (!email.content) {
      setEmail(errorFormField);
    }

    if (!body.content) {
      setBody(errorFormField);
    }

    if (!name.content || !email.content || !body.content) {
      return;
    }

    const newComment = {
      id: 0,
      postId: activePost.id,
      name: name.content,
      email: email.content,
      body: body.content,
    };

    postComment(newComment);
    setBody(initialFormField);
  };

  const validateError = (value: FormField) => {
    return classNames(
      'input',
      {
        'is-danger': value.error,
      },
    );
  };

  const errorTriangle = (
    <span
      className="icon is-small is-right has-text-danger"
      data-cy="ErrorIcon"
    >
      <i className="fas fa-exclamation-triangle" />
    </span>
  );

  const errorMessage = (message: string) => (
    <p className="help is-danger" data-cy="ErrorMessage">
      {message}
    </p>
  );

  return (
    <form data-cy="NewCommentForm">
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
            value={name.content}
            className={validateError(name)}
            onChange={handleInputContacts}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name.error && errorTriangle}
        </div>

        {name.error && errorMessage(FormErrors.Name)}
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
            value={email.content}
            className={validateError(email)}
            onChange={handleInputContacts}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {email.error && errorTriangle}
        </div>

        {email.error && errorMessage(FormErrors.Email)}

      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={body.content}
            placeholder="Type comment here"
            className={validateError(body)}
            onChange={handleInputTextArea}
          />
        </div>

        {body.error && errorMessage(FormErrors.TextArea)}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              {
                'is-loading': isFormLoading,
              },
            )}
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetFormFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
