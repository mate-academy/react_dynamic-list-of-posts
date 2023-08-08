/* eslint-disable no-console */
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
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isCommentAddLoading,
    setIsCommentAddLoading] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>,
  type: InputType) => {
    switch (type) {
      case InputType.NAME: {
        setName(event.target.value);
        if (nameError) {
          setNameError(false);
        }

        break;
      }

      case InputType.EMAIL: {
        setEmail(event.target.value);
        setEmailError(false);
        break;
      }

      case InputType.BODY: {
        setBody(event.target.value);
        setBodyError(false);
        break;
      }

      default: {
        break;
      }
    }
  }, [name, email, body]);

  const formSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validName = name.replace(/\s/g, '') !== '';
    const validEmail = isEmail(email);
    const validBody = body.replace(/\s/g, '') !== '';

    if (!validName) {
      setNameError(true);
    }

    if (!validEmail) {
      setEmailError(true);
    }

    if (!validBody) {
      setBodyError(true);
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
        .catch((error) => {
          console.error('Error posting comment:', error);
        })
        .finally(() => {
          setIsCommentAddLoading(false);
          setBody('');
        });
    }
  }, [name, email, body, selectedPost]);

  const formReset = useCallback(() => {
    setName('');
    setEmail('');
    setBody('');

    setNameError(false);
    setEmailError(false);
    setBodyError(false);
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
