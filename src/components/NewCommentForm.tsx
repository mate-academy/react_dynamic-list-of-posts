import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  // comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  selectedPost: Post;
  showForm: boolean;
  // setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewCommentForm: React.FC<Props> = ({
  // comments,
  setComments,
  selectedPost,
  showForm,
  // setShowForm,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email.trim() || !email.includes('@')) {
      setEmailError('Enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!comment.trim()) {
      setCommentError('Comment is required');
      hasError = true;
    } else {
      setCommentError('');
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    const newCommentData = {
      name,
      email,
      body: comment,
      postId: selectedPost.id,
    };

    try {
      const newComment = await client.post('/comments', newCommentData);

      setComments(prev => [...prev, newComment]);
    } catch {
    } finally {
      setIsLoading(false);
      setComment('');
    }
  };

  const handleReset = () => {
    setComment('');
    setEmail('');
    setName('');
    setNameError('');
    setCommentError('');
    setEmailError('');
  };

  return (
    showForm && (
      <form data-cy="NewCommentForm" onSubmit={event => handleSubmit(event)}>
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
              className={`input ${nameError ? 'is-danger' : ''}`}
              value={name}
              onChange={event => setName(event.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {nameError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {nameError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {nameError}
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
              className={`input ${emailError ? 'is-danger' : ''}`}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {emailError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {emailError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {emailError}
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
              className={`textarea ${commentError ? 'is-danger' : ''}`}
              value={comment}
              onChange={event => setComment(event.target.value)}
            />
          </div>

          {commentError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {commentError}
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={`button is-link ${isLoading ? 'is-loading' : ''}`}
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
    )
  );
};
