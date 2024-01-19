import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../utils/Post';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  loadingComment: boolean;
  setLoadingComment: (load: boolean) => void;
  comments: Comment[];
  setComments: (comment: Comment[]) => void;
  selectedPost: Post;
};

export const NewCommentForm: React.FC<Props> = ({
  loadingComment,
  setLoadingComment,
  comments,
  setComments,
  selectedPost,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    setCommentTextError(false);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const clearForm = () => {
    setEmail('');
    setName('');
    setCommentText('');
    setCommentTextError(false);
    setEmailError(false);
    setNameError(false);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!commentText) {
      setCommentTextError(true);
    }

    if (!commentText || !email || !name) {
      return;
    }

    const newComment = {
      postId: selectedPost.id,
      name,
      email,
      body: commentText,
    };

    setLoadingComment(true);
    addComment(newComment)
      .then((data) => {
        setComments([...comments, data]);
      })
      .finally(() => setLoadingComment(false));
    setCommentText('');
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameError })}
            onChange={(e) => handleName(e)}
            value={name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {nameError && (
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            placeholder="email@test.com"
            onChange={(e) => handleEmail(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            </>
          )}
        </div>

        {emailError && (
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
            className={cn('textarea', { 'is-danger': commentTextError })}
            value={commentText}
            onChange={(e) => handleCommentText(e)}
          />
        </div>

        {commentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loadingComment })}
            onClick={(e) => handleAdd(e)}
            disabled={loadingComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
