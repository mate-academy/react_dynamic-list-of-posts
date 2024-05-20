import { useContext, useState } from 'react';
import cn from 'classnames';

import {
  PostsSettersContext,
  PostsValueContext,
} from '../../Context/PostsContext';
import { addComment } from '../../api/Comments';
import { Comment } from '../../types/Comment';

export const NewCommentForm: React.FC = () => {
  const { selectedPost } = useContext(PostsValueContext);
  const { setPostComments } = useContext(PostsSettersContext);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
  };

  const handleAddComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCommentLoading(true);
    const newErros: { [key: string]: string } = {};

    if (!authorName) {
      newErros.name = 'Name is required';
    }

    if (!authorEmail) {
      newErros.email = 'Email is required';
    }

    if (!commentBody) {
      newErros.body = 'Enter some text';
    }

    setErrors(newErros);

    if (Object.keys(newErros).length) {
      setIsCommentLoading(false);

      return;
    }

    if (!selectedPost || selectedPost.id === undefined) {
      return;
    }

    const newComment: Comment = {
      id: 0,
      postId: selectedPost.id,
      name: authorName,
      email: authorEmail,
      body: commentBody,
    };

    addComment(newComment)
      .then(() => {
        setPostComments((prevComments: Comment[]) => [
          ...prevComments,
          newComment,
        ]);
        setCommentBody('');
      })
      .finally(() => {
        setIsCommentLoading(false);
      });
  };

  const handleClearForm = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setErrors({});
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
            className={cn('input', {
              'is-danger': errors.name,
            })}
            value={authorName}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': errors.email,
            })}
            value={authorEmail}
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
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': errors.body,
            })}
            value={commentBody}
            onChange={handleBodyChange}
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
            className={cn('button is-link', {
              'is-loading': isCommentLoading,
            })}
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
