import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { CommentDetails } from './CommentDetails';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsErrorLoading(false);
      setIsCommentsLoading(true);
      try {
        const result = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(result);
      } catch {
        setIsErrorLoading(true);
      } finally {
        setIsCommentsLoading(false);
      }
    };

    fetchComments();
    setIsFormOpen(false);
  }, [post]);

  const handleDeleteComment = async (id: Comment['id']) => {
    const previousComments = [...comments];

    try {
      setComments(prev => prev.filter(comment => comment.id !== id));
      await client.delete(`/comments/${id}`);
    } catch {
      setComments(previousComments);
    }
  };

  const handleAddComment = async (
    newComment: Omit<Comment, 'id'>,
  ): Promise<void> => {
    try {
      const result = await client.post<Comment>('/comments', newComment);

      setComments(prev => [...prev, result]);
    } catch (error) {
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
        {isCommentsLoading && <Loader />}

        {!isCommentsLoading && isErrorLoading && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isCommentsLoading && !isErrorLoading && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isCommentsLoading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <CommentDetails
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
              />
            ))}
          </>
        )}

        {!isFormOpen && !isErrorLoading && !isCommentsLoading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm postId={post.id} onCommentAdd={handleAddComment} />
      )}
    </div>
  );
};
