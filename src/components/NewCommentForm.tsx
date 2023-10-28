import React, { useState } from 'react';
import cn from 'classnames';
import * as postService from '../utils/apiRequests';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  selectedPost: Post | null;
  setComments: (newComment: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  comments,
  selectedPost,
  setComments,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [hasEmptyLine, setHasEmptyLine] = useState(false);
  const [sendForm, setSendForm] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedPost) {
      if (!name.trim() || !email.trim() || !body.trim()) {
        setHasEmptyLine(true);
      } else {
        setHasEmptyLine(false);

        const newComment = {
          postId: selectedPost.id,
          name,
          email,
          body,
        };

        setSendForm(true);
        postService.postComments(newComment)
          .then(() => {
            const updatedComments: Comment[] = [...comments, newComment];

            setComments(updatedComments);

            setName('');
            setEmail('');
            setBody('');
          })
          .catch(() => {
            setSendForm(true);
          })
          .finally(() => {
            setSendForm(false);
          });
      }
    }
  };

  const handleClearLines = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleAddComment}
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
            className={cn('input', { 'is-danger': sendForm || !name.trim() })}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={cn(
              'icon is-small is-right', { 'has-text-danger': hasEmptyLine },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {hasEmptyLine && (
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
            className={cn('input', { 'is-danger': sendForm || !email.trim() })}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={cn(
              'icon is-small is-right', { 'has-text-danger': hasEmptyLine },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {hasEmptyLine && (
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
              'textarea', { 'is-danger': sendForm || !body.trim() },
            )}
            value={body}
            onChange={handleComment}
          />
        </div>

        {hasEmptyLine && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            // className="button is-link is-loading"
            className={cn('button is-link', { 'is-loading': sendForm })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearLines}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
