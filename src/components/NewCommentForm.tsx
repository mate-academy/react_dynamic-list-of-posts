import React, { useState } from 'react';
import { addComment } from '../api/Comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
  comments: Comment[];
  setPostsComments: (comment: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setPostsComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    body: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorsToUpdate = {
      name: !authorName ? 'Name is required' : '',
      email: !authorEmail ? 'Email is required' : '',
      body: !commentText ? 'Enter some text' : '',
    };

    setErrors(errorsToUpdate);

    if (Object.values(errorsToUpdate).some(error => error)) {
      return;
    }

    setIsLoading(true);

    try {
      const newComment = await addComment({
        postId: postId,
        name: authorName,
        email: authorEmail,
        body: commentText,
      });

      setPostsComments([...comments, newComment]);
      setCommentText('');
      setErrors({ name: '', email: '', body: '' });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
    setErrors({ ...errors, name: '' });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);
    setErrors({ ...errors, body: '' });
  };

  const handleClear = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setErrors({ name: '', email: '', body: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={authorName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errors.name && 'is-danger'}`}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            value={authorEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email && 'is-danger'}`}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            value={commentText}
            placeholder="Type comment here"
            className={`input ${errors.body && 'is-danger'}`}
            onChange={handleCommentChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading && 'is-loading'}`}
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
