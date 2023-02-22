import React, { useState } from 'react';
import cn from 'classnames';
import { createComment } from '../../api/posts';
import cm from '../../types/Comment';

type Props = {
  selectedPostId: number;
  handleAddCommentToState: (comment: cm) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddCommentToState,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [creationCommentError, setCreationCommentError] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [isCommentPosted, setIsCommentPosted] = useState(true);

  const clear = () => {
    setIsInputError(false);
    setName('');
    setEmail('');
    setBody('');
  };

  const postComment = async () => {
    const newPost = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    try {
      setIsCommentPosted(false);

      const commentFromServer = await createComment(newPost);

      handleAddCommentToState(commentFromServer);

      setBody('');
      setIsInputError(false);

      setIsCommentPosted(true);
    } catch {
      setCreationCommentError(true);
      clear();
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() === ''
    || email.trim() === ''
    || body.trim() === '') {
      setIsInputError(true);
    } else {
      postComment();
    }
  };

  const handleCommentPostingError = () => {
    setCreationCommentError(false);
  };

  const handleInput
    = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const field = event.target.name;

      switch (field) {
        case 'name':
          setName(event.target.value);
          break;

        case 'email':
          setEmail(event.target.value);
          break;

        case 'body':
          setBody(event.target.value);
          break;

        default:
          throw new Error('Unexpected field name');
      }
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
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              ' is-danger': isInputError && !name.length,
            })}
            onChange={handleInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {(isInputError && !name.length) && (
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
          )}
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              ' is-danger': isInputError && !email.length,
            })}
            onChange={handleInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(isInputError && !email.length) && (
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
          )}
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
            value={body}
            placeholder="Type comment here"
            className={cn('input', {
              ' is-danger': isInputError && !body.length,
            })}
            onChange={handleInput}
          />
        </div>

        {(isInputError && !body.length) && (
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
              'is-loading': !isCommentPosted,
            })}
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            aria-label="reset-button"
            type="button"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
      {creationCommentError && (
        <div className="notification is-danger">
          <button
            type="button"
            className="delete"
            aria-label="deletion-button"
            onClick={handleCommentPostingError}
          />
          Can`t create a comment
        </div>
      )}
    </form>
  );
};
