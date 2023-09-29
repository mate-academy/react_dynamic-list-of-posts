import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../PostsContext';
import { client } from '../utils/fetchClient';
import { CommentsContext } from '../CommentsContext';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { currentPost } = useContext(PostsContext);
  const {
    setErrorMessage,
    commentsFromServer,
    setCommentsFromServer,
  } = useContext(CommentsContext);
  const [name, setName] = useState<string>('');
  const [hasNameError, setHasNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [bodyText, setBodyText] = useState<string>('');
  const [hasBodyTextError, setHasBodyTextError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setHasNameError(false);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setHasEmailError(false);
  };

  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.currentTarget.value);
    setHasBodyTextError(false);
  };

  const addComment = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHasNameError(!name);
    setHasEmailError(!email);
    setHasBodyTextError(!bodyText);

    if (!name || !email || !bodyText) {
      return;
    }

    const creatComment = {
      postId: currentPost?.id,
      name,
      email,
      body: bodyText,
    };

    try {
      setIsLoading(true);
      const newComment: Comment = await client.post('/comments', creatComment);
      const updatedComments: Comment[] = [...commentsFromServer, newComment];

      setCommentsFromServer(updatedComments);
      setBodyText('');
    } catch {
      setErrorMessage('add');
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyTextError(false);
    setName('');
    setEmail('');
    setBodyText('');
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className={cn('control has-icons-left', {
          'has-icons-right': hasNameError,
        })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={handleName}
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

        <div className={cn('control has-icons-left', {
          'has-icons-right': hasEmailError,
        })}
        >
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
            value={email}
            onChange={handleEmail}
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': hasBodyTextError,
            })}
            value={bodyText}
            onChange={handleBody}
          />
        </div>
        {hasBodyTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoading,
            })}
            onClick={addComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => clearForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
