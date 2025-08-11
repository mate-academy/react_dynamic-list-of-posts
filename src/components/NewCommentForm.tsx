import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment } from '../api/api';
import classNames from 'classnames';

type Props = {
  post: Post;
  postComments: Comment[];
  setPostComments: (comments: Comment[]) => void;
  setIsErrorShown: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  postComments,
  setPostComments,
  setIsErrorShown,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setHasNameError(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setHasEmailError(false);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    setHasBodyError(false);
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = name.trim().length === 0;
    const emailError = !/\S+@\S+\.\S+/.test(email.trim());
    const bodyError = body.trim().length === 0;

    setHasNameError(nameError);
    setHasEmailError(emailError);
    setHasBodyError(bodyError);

    if (nameError || emailError || bodyError) {
      return;
    }

    setIsLoading(true);
    setIsErrorShown(false);

    try {
      const createdComment = await addComment({
        postId: post.id,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setPostComments([...(postComments || []), createdComment]);
      setBody('');
      setHasBodyError(false);
    } catch {
      setIsErrorShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            onChange={e => handleEmailChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('input', {
              'is-danger': hasBodyError,
            })}
            onChange={e => handleBodyChange(e.target.value)}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
            disabled={isLoading}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
