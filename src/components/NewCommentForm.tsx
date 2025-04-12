import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api/index';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type NewCommentFormProps = {
  selectedPost: Post | null;
  onCommentAdded: (comment: Comment) => void;
  onError: (errorMessage: string) => void;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  selectedPost,
  onCommentAdded,
  onError,
}) => {
  const [nameQuery, setNameQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [commentTextQuery, setCommentTextQuery] = useState('');

  const [nameControl, setNameControl] = useState(false);
  const [emailControl, setEmailControl] = useState(false);
  const [commentTextControl, setCommentTextControl] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async () => {
    setIsLoading(true);
    try {
      const dataComments = await addComment({
        postId: selectedPost?.id,
        name: nameQuery,
        email: emailQuery,
        body: commentTextQuery,
      });

      onCommentAdded(dataComments);
    } catch {
      onError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameQuery(e.target.value);
    setNameControl(false);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailQuery(e.target.value);
    setEmailControl(false);
  };

  const handleChangeCommentText = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentTextQuery(e.target.value);
    setCommentTextControl(false);
  };

  const handleClearField = () => {
    setNameQuery('');
    setEmailQuery('');
    setCommentTextQuery('');
    setNameControl(false);
    setEmailControl(false);
    setCommentTextControl(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (nameQuery.trim() === '') {
      setNameControl(true);
      hasError = true;
    }

    if (emailQuery.trim() === '') {
      setEmailControl(true);
      hasError = true;
    }

    if (commentTextQuery.trim() === '') {
      setCommentTextControl(true);
      hasError = true;
    }

    if (!hasError && selectedPost?.id) {
      submitComment();
      setNameQuery(nameQuery);
      setEmailQuery(emailQuery);
      setCommentTextQuery('');
    } else if (!selectedPost?.id) {
      onError('No post selected');
    }
  };

  return (
    <form onSubmit={handleSubmitComment} data-cy="NewCommentForm">
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
            className={classNames('input', {
              'is-danger': nameControl,
            })}
            value={nameQuery}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameControl && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameControl && (
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
            className={classNames('input', {
              'is-danger': emailControl,
            })}
            value={emailQuery}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailControl && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailControl && (
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
            className={classNames('textarea', {
              'is-danger': commentTextControl,
            })}
            value={commentTextQuery}
            onChange={handleChangeCommentText}
          />
        </div>

        {commentTextControl && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearField}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
