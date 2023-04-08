import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { deleteComment, getCommentsToPost } from '../api/mate';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const {
    id,
    title,
    body,
  } = selectedPost;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const getCommentsFromServer = useCallback(async (postId: number) => {
    setIsLoading(true);
    setShowError(false);
    try {
      const result = await getCommentsToPost(postId);

      setComments(result);
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addComment = (comment: Comment) => {
    setComments(prev => [
      ...prev,
      comment,
    ]);
  };

  const removeCommentById = async (commentId: number) => {
    const commentToDelete = comments.find(comment => comment.id === commentId);
    const index = commentToDelete ? comments.indexOf(commentToDelete) : -1;

    setComments(prev => prev.filter(commnet => commnet.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch {
      setShowError(true);

      if (commentToDelete) {
        setComments(prev => {
          const copy = [...prev];

          copy.splice(index, 0, commentToDelete);

          return copy;
        });
      }
    }
  };

  useEffect(() => {
    getCommentsFromServer(id);
    setShowNewCommentForm(false);
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {showError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !showError && (comments.length
            ? (
              <CommentsList
                comments={comments}
                removeCommentById={removeCommentById}
              />
            )
            : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

          {!isLoading && !showError && !showNewCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}

        </div>

        {showNewCommentForm && (
          <NewCommentForm
            addComment={addComment}
            postId={id}
          />
        )}
      </div>
    </div>
  );
};
