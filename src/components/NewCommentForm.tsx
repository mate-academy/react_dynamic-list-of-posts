import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData, Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, onAddComment } = props;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const smthToCleare = [userName, userEmail, userComment].some(Boolean);

  const commentToSend: CommentData = {
    name: userName,
    email: userEmail,
    body: userComment,
    postId,
  };

  const resetInputValues = () => {
    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  const handlerAddingComment = (comment: CommentData) => {
    setIsCommentLoading(true);
    client.post<Comment>('/comments', comment)
      .then((res) => {
        const newCom: Comment = {
          id: res.id,
          postId: res.postId,
          name: res.name,
          email: res.email,
          body: res.body,
        };

        onAddComment(newCom);
      })
      .finally(() => {
        setIsCommentLoading(false);
        resetInputValues();
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => event.preventDefault()}
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
            className={classNames('input', { 'is-danger': !userName })}
            required
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames(
              'icon', 'is-small', 'is-right', { 'has-text-danger': !userName },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!userName && (
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
            className={classNames('input', { 'is-danger': !userEmail })}
            required
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames(
              'icon', 'is-small', 'is-right', { 'has-text-danger': !userEmail },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!userEmail && (
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
            className={classNames('textarea', { 'is-danger': !userComment })}
            required
            value={userComment}
            onChange={(event) => setUserComment(event.target.value)}
          />
        </div>

        {!userComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isCommentLoading },
            )}
            onClick={() => handlerAddingComment(commentToSend)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetInputValues}
            disabled={!smthToCleare}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
