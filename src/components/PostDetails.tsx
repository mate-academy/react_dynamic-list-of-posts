import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { useState } from 'react';

interface Props {
  post: Post | null;
  isPostCommentsLoading: boolean;
  selectedPostComments: Comment[];
  hasPostCommentsError: boolean;
  isWriteCommentFormOpen: boolean;
  onWriteCommentFormOpen: (value: boolean) => void;
  onAddCommentError: () => void;
  onAddComment: (comment: Comment) => void;
  onCommentDelete: (commentId: number) => void;
}

export const PostDetails = ({
  post,
  isPostCommentsLoading,
  selectedPostComments,
  hasPostCommentsError,
  isWriteCommentFormOpen,
  onWriteCommentFormOpen,
  onAddCommentError,
  onAddComment,
  onCommentDelete,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldShowNoCommentsMessage =
    !hasPostCommentsError &&
    !isPostCommentsLoading &&
    selectedPostComments.length === 0;

  const shouldShowComments =
    !hasPostCommentsError &&
    !isPostCommentsLoading &&
    selectedPostComments.length > 0;

  const shouldShowWriteComment =
    !isPostCommentsLoading && !hasPostCommentsError && !isWriteCommentFormOpen;

  const createNewComment = async (commentData: CommentData) => {
    try {
      setIsSubmitting(true);

      const newCommentResponse = await client.post<Comment>('/comments', {
        postId: post?.id,
        ...commentData,
      });

      onAddComment(newCommentResponse);
    } catch {
      onAddCommentError();

      throw new Error();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const commentToDelete = selectedPostComments.find(
      comment => comment.id === commentId,
    );

    if (!commentToDelete) {
      return;
    }

    onCommentDelete(commentId);

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      onAddComment(commentToDelete);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {post && (
          <>
            <div className="block">
              <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

              <p data-cy="PostBody">{post.body}</p>
            </div>

            <div className="block">
              {isPostCommentsLoading && <Loader />}

              {hasPostCommentsError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {shouldShowNoCommentsMessage && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {shouldShowComments && (
                <>
                  <p className="title is-4">Comments:</p>

                  {selectedPostComments.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
                          onClick={() => handleCommentDelete(comment.id)}
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

              {shouldShowWriteComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => onWriteCommentFormOpen(true)}
                >
                  Write a comment
                </button>
              )}
            </div>
          </>
        )}

        {post && !hasPostCommentsError && isWriteCommentFormOpen && (
          <NewCommentForm
            isSubmitting={isSubmitting}
            onSubmitSuccess={createNewComment}
          />
        )}
      </div>
    </div>
  );
};
