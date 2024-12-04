/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../api/ClientFunctions';

interface Props {
  openedPost: Post;
  doesFormExist: boolean;
  setDoesFormExist: (value: boolean) => void;
}

export const PostDetails: React.FC<Props> = React.memo(
  ({ openedPost, doesFormExist, setDoesFormExist }) => {
    // #region states

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsError, setCommentsError] = useState(false);
    const [areCommLoading, setAreCommLoading] = useState(false);

    // #endregion
    // #region variables

    const { id, title, body } = openedPost;
    const conditionForButton =
      !commentsError && !areCommLoading && !doesFormExist;

    // #endregion
    // #region useEffects

    useEffect(() => {
      setAreCommLoading(true);

      getPostComments(id)
        .then(_comments => {
          setComments(_comments);

          if (commentsError) {
            setCommentsError(false);
          }
        })
        .catch(() => setCommentsError(true))
        .finally(() => setAreCommLoading(false));
    }, [id]);

    // #endregion
    // #region handlers

    const deleteHandler = (_id: number) => {
      const updatedComments = comments.filter(comment => comment.id !== _id);

      setComments(updatedComments);

      deleteComment(_id);
    };

    // #endregion
    // #region markups

    const errorMarkup = (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
    const noCommentsMarkup = (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
    const commentsTitleMarkup = <p className="title is-4">Comments:</p>;
    const commentsMarkup = comments.map(comment => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { id, name, body, email } = comment;

      return (
        <article
          key={`comment-${id}`}
          className="message is-small"
          data-cy="Comment"
        >
          <div className="message-header">
            <a href={`mailto:${email}`} data-cy="CommentAuthor">
              {name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => deleteHandler(id)}
            >
              delete button
            </button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {body}
          </div>
        </article>
      );
    });

    // #endregion

    return (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${id}`}: {title}
            </h2>

            <p data-cy="PostBody">{body}</p>
          </div>

          <div className="block">
            {areCommLoading ? (
              <Loader />
            ) : (
              (commentsError && errorMarkup) ||
              (comments.length === 0 && noCommentsMarkup) ||
              (commentsTitleMarkup && commentsMarkup)
            )}

            {conditionForButton && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setDoesFormExist(true)}
              >
                Write a comment
              </button>
            )}
          </div>

          {doesFormExist && (
            <NewCommentForm
              postId={id}
              commentsError={commentsError}
              setCommentsError={setCommentsError}
              setDoesFormExist={setDoesFormExist}
              setComments={setComments}
            />
          )}
        </div>
      </div>
    );
  },
);

PostDetails.displayName = 'PostDetails';
