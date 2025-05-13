import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getPostComments } from '../api/api';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const postComments = await getPostComments(post?.id);

      setComments(postComments);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [post?.id]);

  useEffect(() => {
    if (post?.id !== undefined) {
      loadComments();
    }

    setIsFormShown(false);
  }, [loadComments, post.id]);

  const handleDeletedComments = async (commentId?: number) => {
    try {
      await deleteComment(commentId);
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    } catch (error) {
      setErrorMessage('Unable to delete comment');
    }
  };

  const handleAddComment = async (
    newComment: Omit<Comment, 'id'>,
  ): Promise<void> => {
    try {
      const result = await addComment(newComment);

      setComments(prev => [...prev, result]);
    } catch (error) {
      setErrorMessage('Unable to add comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              #{post.id}: {post.title}
            </h2>

            <p data-cy="PostBody">{post?.body}</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="block">
              {errorMessage ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              ) : comments.length === 0 ? (
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
                          onClick={() => {
                            handleDeletedComments(comment.id);
                          }}
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

              {!errorMessage &&
                (!isFormShown ? (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsFormShown(true)}
                  >
                    Write a comment
                  </button>
                ) : (
                  <NewCommentForm
                    onSubmit={handleAddComment}
                    postId={post.id}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
