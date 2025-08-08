import classNames from 'classnames';
import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | undefined;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
  setErrorIsSubmiting: React.Dispatch<React.SetStateAction<string>>;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setErrorIsSubmiting,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errorNameInput, setErrorNameInput] = useState('');
  const [errorEmailInput, setErrorEmailInput] = useState('');
  const [errorBodyInput, setErrorBodyInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target.value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target.value);
  };

  const handleInputBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event?.target.value);
  };

  const completionOfSending = () => {
    setBody('');
    setErrorNameInput('');
    setErrorEmailInput('');
    setErrorBodyInput('');
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorNameInput('');
    setErrorEmailInput('');
    setErrorBodyInput('');
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim() !== '' && email.trim() !== '' && body.trim() !== '') {
      setIsSubmitting(true);

      const createdComment = {
        postId: post?.id,
        name: name,
        email: email,
        body: body,
      };

      client
        .post<Comment>('/comments', createdComment)
        .then(newComment => {
          setComments(currentComments => {
            if (currentComments) {
              return [...currentComments, newComment];
            }

            return [newComment];
          });
          completionOfSending();
        })
        .catch(() => setErrorIsSubmiting('Something went wrong'))
        .finally(() => setIsSubmitting(false));
    }

    if (name.trim() === '') {
      setErrorNameInput('Name is required');
    }

    if (email.trim() === '') {
      setErrorEmailInput('Email is required');
    }

    if (body.trim() === '') {
      setErrorBodyInput('Enter some text');
    }

    return;
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            // name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errorNameInput,
            })}
            onChange={handleInputName}
            onFocus={() => {
              setErrorNameInput('');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': errorNameInput,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {errorNameInput}
        </p>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            // name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': errorEmailInput,
            })}
            onChange={handleInputEmail}
            onFocus={() => {
              setErrorEmailInput('');
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames('icon is-small is-right', {
              'has-text-danger': errorEmailInput,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {errorEmailInput}
        </p>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            // name="body"
            value={body}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': errorBodyInput,
            })}
            onChange={handleInputBody}
            onFocus={() => {
              setErrorBodyInput('');
            }}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {errorBodyInput}
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
            onClick={handleClick}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
