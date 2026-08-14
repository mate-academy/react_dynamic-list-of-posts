import React from 'react';

import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const [addError, setAddError] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setComments([]);
    setIsFormVisible(false);
    setAddError(false);
    setDeleteError(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    const previousComments = comments;

    setDeleteError(false);

    // Delete immediately from UI
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      // Restore comment if API request failed
      setComments(previousComments);
      setDeleteError(true);
    });
  };

  const handleAddComment = async (commentData: CommentData) => {
    setAddError(false);

    try {
      const newComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      // Add new comment to the end of the list
      setComments(currentComments => [...currentComments, newComment]);
    } catch (error) {
      setAddError(true);

      // Let NewCommentForm know that request failed
      throw error;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && (
          <>
            {deleteError && (
              <div
                className="notification is-danger"
                data-cy="DeleteCommentError"
              >
                Unable to delete comment. Please try again.
              </div>
            )}

            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
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
                        onClick={() => handleDelete(comment.id)}
                      />
                    </div>

                    <div
                      className="message-body"
                      data-cy="CommentBody"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {!isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsFormVisible(true);
                  setAddError(false);
                }}
              >
                Write a comment
              </button>
            )}

            {isFormVisible && (
              <>
                {addError && (
                  <div
                    className="notification is-danger"
                    data-cy="AddCommentError"
                  >
                    Unable to add comment. Please try again.
                  </div>
                )}

                <NewCommentForm onSubmit={handleAddComment} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
