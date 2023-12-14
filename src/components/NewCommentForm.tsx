import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from './PostsProvider';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { URL } from '../types/Url';

export const NewCommentForm: React.FC = () => {
  const { selectedPost } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { id } = selectedPost as Post;

  const [isWrongName, setIsWrongName] = useState(false);
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [isWrongText, setIsWrongText] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsWrongName(false);
    setIsWrongEmail(false);
    setIsWrongText(false);
  }, []);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsWrongName(false);
    setName(e.target.value);
  };

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setIsWrongName(true);
    }

    if (!email.trim()) {
      setIsWrongEmail(true);
    }

    if (!text.trim()) {
      setIsWrongText(true);
    }

    if (name.trim() && email.trim() && text.trim()) {
      try {
        setIsLoading(true);
        const newComment: Omit<Comment, 'id'> = {
          postId: id,
          name,
          email,
          body: text,
        };

        const response = await client.post<Comment>(URL.Comments, newComment);

        dispatch({ type: 'addComment', payload: response });
        setText('');
      } catch (error) {
        dispatch({ type: 'error', payload: Error.CreateComment });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setText('');

    setIsWrongName(false);
    setIsWrongEmail(false);
    setIsWrongText(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={submitComment}
    >
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
            value={name}
            onChange={handleChangeName}
            className={classNames('input', { 'is-danger': isWrongName })}
          />

          <span
            className="icon is-small is-left"
          >
            <i className="fas fa-user" />
          </span>

          {isWrongName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isWrongName && (
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={classNames('input', { 'is-danger': isWrongEmail })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isWrongEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isWrongEmail && (
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
            value={text}
            onChange={e => setText(e.target.value)}
            className={classNames('textarea', { 'is-danger': isWrongText })}
          />
        </div>

        {isWrongText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
