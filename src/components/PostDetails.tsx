import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentFormData } from '../types/CommentFormData';

interface PropsPostDetails {
  post: Post;
}

export const PostDetails: React.FC<PropsPostDetails> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState<number | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      setHasCommentsError(false);
      setIsCommentFormVisible(false);

      try {
        const commentsData = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(commentsData);
      } catch (error) {
        setHasCommentsError(true);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [post.id]);

  const handleCommentAdd = async (commentData: CommentFormData) => {
    try {
      const newComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, newComment]);
    } catch (error) {
      throw error;
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    const commentToDelete = comments.find(c => c.id === commentId);

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    setDeleteError(null);
    setDeletingCommentId(commentId);

    try {
      await client.delete(`/comments/${commentId}`);

      setDeletingCommentId(null);
    } catch (error) {
      if (commentToDelete) {
        setComments(prevComments => [...prevComments, commentToDelete]);
      }

      setDeleteError(commentId);
      setDeletingCommentId(null);
    }
  };

  const handleWriteCommentClick = () => {
    setIsCommentFormVisible(true);
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
        {isLoadingComments && <Loader />}

        {hasCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !hasCommentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !hasCommentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                key={comment.id}
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
                    onClick={() => handleCommentDelete(comment.id)}
                    disabled={deletingCommentId === comment.id}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {deleteError === comment.id && (
                    <div className="notification is-danger is-light">
                      Failed to delete comment.{''}
                      <button
                        className="button is-small is-danger"
                        onClick={() => handleCommentDelete(comment.id)}
                        type="button"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoadingComments && !hasCommentsError && !isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleWriteCommentClick}
          >
            Write a comment
          </button>
        )}

        {!isLoadingComments && !hasCommentsError && isCommentFormVisible && (
          <NewCommentForm onSubmit={handleCommentAdd} />
        )}
      </div>
    </div>
  );
};
