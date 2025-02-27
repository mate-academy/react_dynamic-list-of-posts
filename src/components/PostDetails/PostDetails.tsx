/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

import * as commentService from '../../api/Comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post: { id, title, body } }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );
  const [isShowAddForm, setIsShowAddForm] = useState(false);

  useEffect(() => {
    setIsShowAddForm(false);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    commentService
      .getComments(id)
      .then(commentsFromServer => setComments(commentsFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteComment = (commentId: number) => {
    setLoadingDeleteComment(true);
    setErrorMessage('');
    setDeletingCommentId(commentId);

    commentService
      .deleteComment(commentId)
      .then(() =>
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        ),
      )
      .catch(() => setErrorMessage('Unable to delete a comment'))
      .finally(() => {
        setLoadingDeleteComment(false);
        setDeletingCommentId(null);
      });
  };

  const handleAddComment = ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    setErrorMessage('');
    setLoading(true);

    commentService
      .addComment({ postId, name, email, body })
      .then(newComment => {
        setComments(prevComments => [...prevComments, newComment]);
      })
      .catch(() => setErrorMessage('Unable to add a comment'))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : (
            <>
              {errorMessage.length > 0 && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              )}

              {!errorMessage && comments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!errorMessage && comments.length > 0 && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      {/* eslint-disable */}
                      {loadingDeleteComment &&
                      deletingCommentId === comment.id ? (
                        <Loader />
                      ) : (
                        <>
                          <div className="message-header">
                            <a
                              href={`mailto:${comment.email}`}
                              data-cy="CommentAuthor"
                            >
                              {comment.name}
                            </a>
                            <button
                              data-cy="CommentDelete"
                              type="button"
                              className="delete is-small"
                              aria-label="delete"
                              onClick={() => handleDeleteComment(comment.id)}
                            />
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {comment.body}
                          </div>
                        </>
                      )}
                      {/* eslint-enable */}
                    </article>
                  ))}
                </>
              )}

              {!errorMessage && !isShowAddForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsShowAddForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}

          {isShowAddForm && (
            <NewCommentForm
              postId={id}
              onAddComment={handleAddComment}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
