import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData, Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

const isCommentFilled = {
  authorName: false,
  authorEmail: false,
  commentText: false,
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, onAddComment } = props;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  // eslint-disable-next-line max-len
  const [isCommentCompleated, setIsCommentCompleated] = useState(isCommentFilled);

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
            className={classNames('input',
              { 'is-danger': !userName && isCommentCompleated.authorName })}
            required
            value={userName}
            onBlur={() => setIsCommentCompleated(prev => ({
              ...prev,
              authorName: true,
            }
            ))}
            onChange={(event) => setUserName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={classNames(
              'icon', 'is-small', 'is-right',
              // eslint-disable-next-line max-len
              { 'has-text-danger': !userName && isCommentCompleated.authorName },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!userName && (
          <p
            className={classNames('help',
              { 'is-danger': !userName && isCommentCompleated.authorName })}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input',
              { 'is-danger': !userEmail && isCommentCompleated.authorEmail })}
            required
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            onBlur={() => setIsCommentCompleated(prev => ({
              ...prev,
              authorEmail: true,
            }
            ))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={classNames(
              'icon', 'is-small', 'is-right',
              // eslint-disable-next-line max-len
              { 'has-text-danger': !userEmail && isCommentCompleated.authorEmail },
            )}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!userEmail && (
          <p
            className={classNames('help',
              { 'is-danger': !userEmail && isCommentCompleated.authorEmail })}
            data-cy="ErrorMessage"
          >
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
            className={classNames('textarea',
              { 'is-danger': !userComment && isCommentCompleated.commentText })}
            required
            value={userComment}
            onChange={(event) => setUserComment(event.target.value)}
            onBlur={() => setIsCommentCompleated(prev => ({
              ...prev,
              commentText: true,
            }))}
          />
        </div>

        {!userComment && (
          <p
            className={classNames('help',
              { 'is-danger': !userComment && isCommentCompleated.commentText })}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={!userName || !userEmail || !userComment}
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
