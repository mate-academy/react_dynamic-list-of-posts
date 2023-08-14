import React, { useCallback, useEffect, useState } from 'react';
import { addComment, getComments, removeComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm/NewCommentForm';

type Props = {
  selectedPost: Post
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    setError(false);
    try {
      const commentsFromServer = await getComments(selectedPost.id);

      setComments(commentsFromServer);
    } catch {
      setError(true);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const addNewComment = useCallback(
    async (newComment: CommentData) => {
      setLoading(true);
      try {
        const commentToAdd = {
          ...newComment,
          postId: selectedPost.id,
        };
        const comment = await addComment(commentToAdd);

        setComments(currentComments => [...currentComments, comment]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, [],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      try {
        await removeComment(commentId);
        setComments(currentComments => {
          return currentComments.filter(comment => comment.id !== commentId);
        });
      } catch {
        setError(true);
      }
    }, [],
  );

  useEffect(() => {
    fetchComments();
    setIsVisibleForm(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments.length && !error && !loading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length > 0) && (
            <p className="title is-4">Comments:</p>)}

          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
            />
          ))}

          {(!isVisibleForm && !error && !loading) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsVisibleForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isVisibleForm && (
          <NewCommentForm
            onAddComment={addNewComment}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};
