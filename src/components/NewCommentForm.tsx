import React, { useContext, useState } from 'react';
import { ContextUsers } from './UsersContext';
import { postComment } from './api/postComment';
import cn from 'classnames';

export const NewCommentForm: React.FC = () => {
  const { selectedPost, setComments, setIsLoading } = useContext(ContextUsers);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [authorErr, setAuthorrErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [commentErr, setCommentErr] = useState(false);
  const [isLoadingbutton, setIsLoadingbutton] = useState(false);

  const addComment = () => {
    if (!selectedPost) {
      return;
    }

    const newComment = {
      id: 0,
      postId: selectedPost.id,
      name: author,
      email: email,
      body: comment,
    };

    setComments(prevComments => [...prevComments, newComment]);

    const postCom = () => {
      setIsLoadingbutton(true);
      postComment(newComment)
        .then(() => setIsLoadingbutton(false))
        .finally(() => {
          setIsLoading(false);
          setComment('');
        });
    };

    postCom();
  };

  const handleClear = () => {
    setAuthor('');
    setComment('');
    setEmail('');
    setAuthorrErr(false);
    setCommentErr(false);
    setEmailErr(false);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (author === '') {
      setAuthorrErr(true);
    }

    if (email === '') {
      setEmailErr(true);
    }

    if (comment === '') {
      setCommentErr(true);
    }

    if (author === '' || email === '' || comment === '') {
      return;
    }

    addComment();
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
            value={author}
            onChange={event => setAuthor(event.target.value)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': authorErr })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorErr && (
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
            onChange={event => setEmail(event.target.value)}
            className={cn('input', { 'is-danger': emailErr })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErr && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailErr && (
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
            value={comment}
            onChange={event => setComment(event.target.value)}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': commentErr })}
          />
        </div>

        {commentErr && (
          <p
            className={cn('help', { 'is-danger': commentErr })}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            onClick={event => handleSubmit(event)}
            className={cn('button is-link', {
              'is-loading': isLoadingbutton,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            onClick={handleClear}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
