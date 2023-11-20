import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  onCommentAdd: (comms: Comment[] | ((prev: Comment[]) => Comment[])) => void
  currentPost: Post
}

export const NewCommentForm: React.FC<Props> = ({
  onCommentAdd,
  currentPost,
}) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [text, setText] = useState('');
  const [hasTextError, setHasTextError] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const commentAddHandler = useCallback((
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !text.trim()) {
      setHasNameError(!name.trim());
      setHasEmailError(!email.trim());
      setHasTextError(!text.trim());
      setName(n => n.trim());
      setEmail(em => em.trim());
      setText(t => t.trim());

      return;
    }

    setIsFormLoading(true);

    client.post<Comment>('/comments', {
      postId: currentPost.id,
      name,
      email,
      body: text,
    }).then(post => onCommentAdd(posts => [...posts, post]))
      .finally(() => {
        setIsFormLoading(false);
        setText('');
      });
  }, [name, email, text]);

  const formClearHandler = useCallback(() => {
    setEmail('');
    setName('');
    setText('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasTextError(false);
  }, []);

  const nameChangeHandler = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
    setHasNameError(false);
  }, []);

  const emailChangeHandler = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  }, []);

  const textChangeHandler = useCallback((
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
    setHasTextError(false);
  }, []);

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
            className={cn(
              'input',
              { 'is-danger': hasNameError },
            )}
            value={name}
            onChange={nameChangeHandler}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn(
              'input',
              { 'is-danger': hasEmailError },
            )}
            value={email}
            onChange={emailChangeHandler}
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
            className={cn(
              'textarea',
              { 'is-danger': hasTextError },
            )}
            value={text}
            onChange={textChangeHandler}
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
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isFormLoading },
            )}
            onClick={commentAddHandler}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={formClearHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
