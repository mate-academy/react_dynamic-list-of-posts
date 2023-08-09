import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import isEmail from 'validator/lib/isEmail';
import { Comment } from '../types/Comment';
import { postComment } from '../utils/api';
import { Post } from '../types/Post';

interface Props {
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  selectedPost: Post | null;
}

enum InputType {
  NAME = 'name',
  EMAIL = 'email',
  BODY = 'body',
}

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  selectedPost,
}) => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    bodyError: false,
  });

  const [
    isCommentAddLoading,
    setIsCommentAddLoading,
  ] = useState<boolean>(false);

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>,
  type: InputType) => {
    switch (type) {
      case InputType.NAME: {
        setFields((prevFields) => ({
          ...prevFields,
          name: event.target.value,
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          nameError: false,
        }));

        break;
      }

      case InputType.EMAIL: {
        setFields((prevFields) => ({
          ...prevFields,
          email: event.target.value,
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          emailError: false,
        }));

        break;
      }

      case InputType.BODY: {
        setFields((prevFields) => ({
          ...prevFields,
          body: event.target.value,
        }));

        setErrors(prevErrors => ({
          ...prevErrors,
          bodyError: false,
        }));

        break;
      }

      default: {
        break;
      }
    }
  }, []);

  const { name, email, body } = fields;
  const { nameError, emailError, bodyError } = errors;

  const formSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validName = name.replace(/\s/g, '') !== '';
    const validEmail = isEmail(email);
    const validBody = body.replace(/\s/g, '') !== '';

    if (!validName) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nameError: true,
      }));
    }

    if (!validEmail) {
      setErrors(prevErrors => ({
        ...prevErrors,
        emailError: true,
      }));
    }

    if (!validBody) {
      setErrors(prevErrors => ({
        ...prevErrors,
        bodyError: true,
      }));
    }

    if (validName && validEmail && validBody && selectedPost) {
      setIsCommentAddLoading(true);
      const newComment = {
        id: 0,
        postId: selectedPost.id,
        name,
        email,
        body,
      };

      postComment(selectedPost.id, newComment)
        .then((createdComment) => {
          setComments((prevComments) => [
            ...prevComments as Comment[],
            createdComment,
          ]);
        })
        .catch(() => {
          throw new Error('Failed to create comment');
        })
        .finally(() => {
          setIsCommentAddLoading(false);
          setFields({
            name: '',
            email: '',
            body: '',
          });
        });
    }
  }, [name, email, body, selectedPost]);

  const formReset = useCallback(() => {
    setFields({
      name: '',
      email: '',
      body: '',
    });

    setErrors({
      nameError: false,
      emailError: false,
      bodyError: false,
    });
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => formSubmit(event)}
      onReset={() => formReset()}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={(event) => handleInput(event, InputType.NAME)}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${cn({ 'is-danger': nameError })}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError
          && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError
        && (
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
            value={email}
            onChange={(event) => handleInput(event, InputType.EMAIL)}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${cn({ 'is-danger': emailError })}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError
          && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError
        && (
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
            value={body}
            onChange={(event) => handleInput(event, InputType.BODY)}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${cn({ 'is-danger': bodyError })}`}
          />
        </div>

        {bodyError
        && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className={`button is-link ${cn({ 'is-loading': isCommentAddLoading })}`}>
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
