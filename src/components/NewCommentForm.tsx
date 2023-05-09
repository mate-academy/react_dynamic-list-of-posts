import classNames from 'classnames';
import React, { useState } from 'react';
import { ApiRouters } from '../utils/ApiRouters';
import { Comment } from '../types/Comment';

interface Props {
  post: (
    url: string,
    data: Comment,
  ) => Promise<Comment>;
  postId: number | null;
  comments: Comment[] | null;
  setComments: (comments: Comment[]) => void;
}

enum AvailableElement {
  NAME = 'name',
  EMAIL = 'email',
  COMMENT = 'comment',
}

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  postId,
  comments,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isNotValid = (element: string) => (
    isFormSubmitted && !element.length
  );

  const isEverythingFilled
    = !!name.length && !!email.length && !!comment.length;

  const handleChange = (elementToChange: AvailableElement, value: string) => {
    switch (elementToChange) {
      case AvailableElement.NAME:
        setName(value);
        break;

      case AvailableElement.EMAIL:
        setEmail(value);
        break;

      case AvailableElement.COMMENT:
        setComment(value);
        break;

      default:
        break;
    }
  };

  const handleCommentAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const newComment = {
      name,
      email,
      body: comment,
      postId,
    };

    if (isEverythingFilled && postId) {
      try {
        setIsLoading(true);

        const newCommentFromServer
          = await post(ApiRouters.COMMENTS, newComment);

        if (comments) {
          setComments([...comments, newCommentFromServer]);
        }

        setIsFormSubmitted(false);
      } catch {
        setIsFormSubmitted(false);
      }
    }

    setComment('');
    setIsLoading(false);
  };

  const handleClear = () => {
    setIsFormSubmitted(false);
    setComment('');
    setName('');
    setEmail('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleCommentAdd}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={
              (e) => handleChange(AvailableElement.NAME, e.target.value)
            }
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': isNotValid(name) })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNotValid(name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNotValid(name) && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            value={email}
            onChange={
              (e) => handleChange(AvailableElement.EMAIL, e.target.value)
            }
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': isNotValid(email) })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isNotValid(email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNotValid(email) && (
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
            onChange={
              (e) => handleChange(AvailableElement.COMMENT, e.target.value)
            }
            placeholder="Type comment here"
            className={
              classNames(
                'textarea',
                { 'is-danger': isNotValid(comment) },
              )
            }
          />
        </div>

        {isNotValid(comment) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              classNames(
                'button is-link',
                { 'is-loading': isLoading && isEverythingFilled },
              )
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
