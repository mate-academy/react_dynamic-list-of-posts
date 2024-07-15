import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, Post } from '../types';
import { deleteComments, getComments } from '../api/dataFromServer';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { id, title, body } = post;

  useEffect(() => {
    setShowForm(false);
    setLoadingComments(true);
    getComments(id)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setLoadingComments(false));
  }, [id]);

  const handleDeleteComments = async (commentId: number) => {
    try {
      await deleteComments(commentId);

      setComments(previousComments =>
        previousComments.filter(
          previousComment => previousComment.id !== commentId,
        ),
      );
    } catch {}
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const conditionShowComments = !loadingComments && !commentsError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {conditionShowComments && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {conditionShowComments && Boolean(comments.length) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={uuidv4()}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComments(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}
          {conditionShowComments && !showForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (
          <NewCommentForm postId={post.id} onChangeComment={handleAddComment} />
        )}
      </div>
    </div>
  );
};
