import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import cn from 'classnames';

import { addComment } from '../api/comments';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm: FC<Props> = ({ selectedPost, setComments }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorNameError, setAuthorNameError] = useState(false);
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorEmailError, setAuthorEmailError] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (event.target.name) {
      case 'name':
        setAuthorNameError(false);
        setAuthorName(event.target.value.trim());
        break;

      case 'email':
        setAuthorEmailError(false);
        setAuthorEmail(event.target.value.trim());
        break;

      case 'body':
        setCommentTextError(false);
        setCommentText(event.target.value.trim());
        break;
    }
  };

  const handleResetForm = () => {
    setAuthorName('');
    setAuthorEmailError(false);
    setAuthorEmail('');
    setAuthorEmailError(false);
    setCommentText('');
    setCommentTextError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedAuthorName = authorName.trim();
    const preparedAuthorEmail = authorEmail.trim();
    const preparedCommentText = commentText.trim();

    if (!preparedAuthorName) {
      setAuthorNameError(true);
    }

    if (!preparedAuthorEmail) {
      setAuthorEmailError(true);
    }

    if (!preparedCommentText) {
      setCommentTextError(true);
    }

    if (!preparedAuthorEmail || !preparedAuthorName || !preparedCommentText) {
      return;
    }

    setIsLoading(true);

    const commentToAdd: Omit<Comment, 'id'> = {
      postId: selectedPost.id,
      name: preparedAuthorName,
      email: preparedAuthorEmail,
      body: preparedCommentText,
    };

    addComment(commentToAdd)
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setCommentText('');
      })
      .catch(() => 'Something Wrong')
      .finally(() => setIsLoading(false));
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': authorNameError })}
            value={authorName}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorNameError && (
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
            className={cn('input', { 'is-danger': authorEmailError })}
            value={authorEmail}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {authorEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {authorEmailError && (
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
            onChange={handleInputChange}
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
            className={cn('button is-link ', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
