import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { CommentItem } from '../CommentItem';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments } from '../../api/commentApi';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setIsFormVisible(false);

    const loadComments = async () => {
      try {
        const loadedComments = await getComments(selectedPost.id);

        setComments(loadedComments);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [selectedPost]);

  function handleDeleteComment(commentId: number) {
    const commentToDelete = comments.find(comment => comment.id === commentId);

    setComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      setHasError(true);
      if (commentToDelete) {
        setComments(prev => [...prev, commentToDelete]);
      }
    });
  }

  function handleAddComment(newComment: Comment) {
    setComments(prev => [...prev, newComment]);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost?.id}: {selectedPost?.title}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
          </>
        )}

        {!isLoading && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormVisible && selectedPost && (
        <NewCommentForm
          postId={selectedPost.id}
          onAddComment={handleAddComment}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};
