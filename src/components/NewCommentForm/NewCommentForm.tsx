import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/getData';
import { GlobalContext } from '../../State';
import { Comment } from '../../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { setIsErrorForm, setComments, selectedPost } =
    useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextError, setHasTextError] = useState(false);
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    setHasTextError(false);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setHasEmailError(false);
    setHasNameError(false);
    setHasTextError(false);
  };

  const handlAddCommet = async (newComment: Omit<Comment, 'id'>) => {
    try {
      setIsLoadingAddComment(true);
      setIsErrorForm(false);
      const addedComment = await addComment(newComment);

      setCommentText('');

      setComments(prevComms => [...prevComms, addedComment]);
    } catch (error) {
      setIsErrorForm(true);
    } finally {
      setIsLoadingAddComment(false);
    }
  };

  const checkErorrsInForm = () => {
    if (name.trim().length === 0) {
      setHasNameError(true);
    }

    if (email.trim().length === 0) {
      setHasEmailError(true);
    }

    if (commentText.trim().length === 0) {
      setHasTextError(true);
    }
  };

  const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    checkErorrsInForm();

    const hasAnyError =
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      commentText.trim().length === 0;

    if (hasAnyError || !selectedPost) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      name,
      postId: selectedPost.id,
      email,
      body: commentText,
    };

    handlAddCommet(newComment);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleCreateComment}>
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
            className={cn('input', { 'is-danger': hasNameError })}
            value={name}
            onChange={handleNameChange}
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={handleEmailChange}
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
            className={cn('textarea', { 'is-danger': hasTextError })}
            value={commentText}
            onChange={handleTextChange}
          />
        </div>

        {hasTextError && (
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
              'is-loading': isLoadingAddComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
