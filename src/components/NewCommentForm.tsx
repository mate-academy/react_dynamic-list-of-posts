import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type NewCommentFormProps = {
  selectedComments: Comment[] | null;
  setSelectedComments: (list: Comment[] | null) => void;
  selectedPost: Post | null;
  setAddCommentError: (val: boolean) => void;
  setVisibleComList: (list: Comment[] | null) => void;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  selectedComments,
  setSelectedComments,
  selectedPost,
  setAddCommentError,
  setVisibleComList,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentAria, setCommentAria] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentAriaError, setCommentAriaError] = useState(false);

  const [newCommentLoading, setnewCommentLoading] = useState(false);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPost) {
      return;
    }

    setNameError(false);
    setEmailError(false);
    setCommentAriaError(false);

    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!commentAria) {
      setCommentAriaError(true);
    }

    if (!name || !email || !commentAria) {
      return;
    }

    const maxId = Math.max(
      ...(selectedComments?.map(comment => comment.id) || [0]),
    );

    const newComment: Comment = {
      id: maxId + 1,
      postId: selectedPost.id,
      name: name,
      email: email,
      body: commentAria,
    };

    try {
      setVisibleComList([...(selectedComments || []), newComment]);
      setnewCommentLoading(true);
      await client.post('/comments', newComment);
      setSelectedComments([...(selectedComments || []), newComment]);
      setCommentAria('');
    } catch {
      setAddCommentError(true);
    } finally {
      setnewCommentLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setCommentAria('');
    setNameError(false);
    setEmailError(false);
    setCommentAriaError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleCommentSubmit}>
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
            className={classNames('input', { 'is-danger': nameError })} //...
            onChange={ev => {
              setNameError(false);
              setName(ev.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && ( //...
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && ( //...
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
            className={classNames('input', { 'is-danger': emailError })} //...
            onChange={ev => {
              setEmailError(false);
              setEmail(ev.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && ( //...
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && ( //...
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
            value={commentAria}
            className={classNames('textarea', {
              'is-danger': commentAriaError,
            })} //...
            onChange={ev => {
              setCommentAriaError(false);
              setCommentAria(ev.target.value);
            }}
          />
        </div>

        {commentAriaError && ( //...
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
              'is-loading': newCommentLoading,
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
            onClick={() => {
              resetForm();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
