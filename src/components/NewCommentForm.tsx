import React, { memo, useState } from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = memo((props) => {
  const { post, setComments } = props;

  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isErrorOnAuthor, setIsErrorOnAuthor] = useState(false);
  const [isErrorOnEmail, setIsErrorOnEmail] = useState(false);
  const [isErrorOnComment, setIsErrorOnComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidValue = (value: string) => {
    return Boolean(value.trim());
  };

  const addNewComment = async (newComment: Omit<Comment, 'id'>) => {
    try {
      setIsLoading(true);

      const addedComment = await addComment(newComment);

      setComments(currentComments => [
        ...currentComments,
        addedComment,
      ]);
    } catch (error) {
      throw new Error('Can\'t add new comment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidValue(author)) {
      setIsErrorOnAuthor(true);
    }

    if (!isValidValue(email)) {
      setIsErrorOnEmail(true);
    }

    if (!isValidValue(comment)) {
      setIsErrorOnComment(true);
    }

    if (!isValidValue(author)
      || !isValidValue(email)
      || !isValidValue(comment)
    ) {
      return;
    }

    addNewComment({
      postId: post.id,
      name: author,
      email,
      body: comment,
    });

    setComment('');
  };

  const handleClearAll = () => {
    setAuthor('');
    setEmail('');
    setComment('');
    setIsErrorOnAuthor(false);
    setIsErrorOnEmail(false);
    setIsErrorOnComment(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={cn(
              'input',
              { 'is-danger': isErrorOnAuthor },
            )}
            value={author}
            onChange={(event) => {
              setAuthor(event.currentTarget.value);
              setIsErrorOnAuthor(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorOnAuthor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorOnAuthor && (
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
            className={cn(
              'input',
              { 'is-danger': isErrorOnEmail },
            )}
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
              setIsErrorOnEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorOnEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorOnEmail && (
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
            className={cn(
              'input',
              { 'is-danger': isErrorOnComment },
            )}
            value={comment}
            onChange={(event) => {
              setComment(event.currentTarget.value);
              setIsErrorOnComment(false);
            }}
          />
        </div>

        {isErrorOnComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
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
            onClick={handleClearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
