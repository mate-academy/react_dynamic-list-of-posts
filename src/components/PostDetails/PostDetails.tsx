import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const loadComments = async (postId: number) => {
    try {
      setComments(null);
      setAreCommentsLoading(true);

      const loadedComments: Comment[] = await client.get(
        `/comments?postId=${postId}`,
      );

      setComments(loadedComments);
    } catch {
      setHasLoadingError(true);
    } finally {
      setAreCommentsLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await client.delete(`/comments/${commentId}`);

      if (comments) {
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch {
      // eslint-disable-next-line no-console
      console.warn('Comment was not deleted from server');
    }
  };

  const handleAddComment = useCallback((comment: Comment) => {
    setComments(prevComments => {
      if (prevComments) {
        return [...prevComments, comment];
      }

      return [comment];
    });
  }, [comments]);

  useEffect(() => {
    setIsCommentFormOpen(false);
    setHasLoadingError(false);
    loadComments(post.id);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {areCommentsLoading && <Loader />}

          {hasLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(comments && !areCommentsLoading && !hasLoadingError) && (
            comments?.length ? (
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
                          deleteComment(comment.id);
                        }}
                      >
                        delete button
                      </button>
                    </div>

                    <div
                      className="message-body"
                      data-cy="CommentBody"
                    >
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

          {(!hasLoadingError && !areCommentsLoading) && (
            isCommentFormOpen ? (
              <NewCommentForm
                handleAddComment={handleAddComment}
                setHasLoadingError={setHasLoadingError}
                postId={post.id}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsCommentFormOpen(true);
                }}
              >
                Write a comment
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
