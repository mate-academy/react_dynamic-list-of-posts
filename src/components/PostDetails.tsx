import React, { useEffect, useState } from 'react';
import { getCommentsOfPost, deleteComment } from '../utils/api';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post?: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [commentsFromServer, setCommentsFromServer] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const currentComments = await getCommentsOfPost(post.id);

        setCommentsFromServer(currentComments);
      } catch {
        setError('Failed to load comments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (post?.id !== currentPostId) {
      setIsFormVisible(false);
      setCurrentPostId(post?.id || null);
      fetchComments();
    }
  }, [post, currentPostId]);

  const handleDelete = async (commentId: number) => {
    const originalComments = [...commentsFromServer];

    setCommentsFromServer(prev =>
      prev.filter(comment => comment.id !== commentId),
    );
    setError(null);

    try {
      await deleteComment(commentId);
    } catch {
      setError('Failed to delete comment. Please try again.');
      setCommentsFromServer(originalComments);
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setCommentsFromServer(prev => [...prev, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>
        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : commentsFromServer.length === 0 ? (
          <>
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
            {!isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
            {isFormVisible && post?.id && (
              <NewCommentForm
                postId={post.id}
                onCommentAdded={handleAddComment}
              />
            )}
          </>
        ) : (
          <>
            <p className="title is-4">Comments:</p>
            {commentsFromServer.map(comment => (
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
                    onClick={() => handleDelete(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

            {!isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}

            {isFormVisible && post?.id && (
              <NewCommentForm
                postId={post.id}
                onCommentAdded={handleAddComment}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
