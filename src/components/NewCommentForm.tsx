import React, { Dispatch, SetStateAction, useState } from 'react';
import { postComment } from '../utils/servicesPost';
import { Comment } from '../types/Comment';
import cn from 'classnames';

type Props = {
  setCurrentComments: Dispatch<SetStateAction<Comment[] | []>>;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({
  setCurrentComments,
  postId,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});

  const newComment: Comment = {
    id: 0,
    postId: postId,
    name: authorName,
    email: authorEmail,
    body: commentText,
  };

  const handlerAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const newErros: { [key: string]: string } = {};

    if (!authorName) {
      newErros.name = 'Name is required';
    }

    if (!authorEmail) {
      newErros.email = 'Email is required';
    }

    if (!commentText) {
      newErros.body = 'Enter some text';
    }

    setErrors(newErros);

    if (Object.keys(newErros).length) {
      setIsLoading(false);

      return;
    }

    if (newComment.body && newComment.email && newComment.name) {
      postComment({ ...newComment })
        .then(() => {
          setCurrentComments(prevComments => [...prevComments, newComment]);
          // setAuthorName('');
          // setAuthorEmail('');
          setCommentText('');
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleClearForm = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setErrors({});
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handlerAddComment}>
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
            onChange={event => setAuthorName(event.target.value)}
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
            onChange={event => setAuthorEmail(event.target.value)}
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
            {errors.name}
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
            className={cn('input', {
              'is-danger': errors.body,
            })}
            value={commentText}
            onChange={event => setCommentText(event.target.value)}
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
              'is-loading': isLoading,
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
