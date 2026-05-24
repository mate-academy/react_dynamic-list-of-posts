import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, getComments, deleteComment } from '../api/comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState('');

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setComments([]);
    setCommentsError('');
    setCommentsLoading(true);
    setIsFormVisible(false);

    getComments(selectedPost.id)
      .then(newComments => {
        setComments(newComments);
      })
      .catch(() => setCommentsError('Something went wrong'))
      .finally(() => {
        setCommentsLoading(false);
      });
  }, [selectedPost]);

  if (!selectedPost) {
    return null;
  }

  const handleAddComment = async (data: CommentData) => {
    if (!selectedPost) {
      return;
    }

    try {
      const newComment = await addComment({
        ...data,
        postId: selectedPost.id,
      });

      setComments(current => [...current, newComment]);
    } catch {
      setCommentsError('Something went wrong');
    }
  };

  const handleDeleteComment = async (id: number) => {
    const prevComments = comments;

    setComments(current => current.filter(comment => comment.id !== id));

    try {
      await deleteComment(id);
    } catch {
      setComments(prevComments);
      setCommentsError('Something went wrong');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsLoading && !commentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {!commentsLoading && !commentsError && !isFormVisible && (
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
      {isFormVisible && <NewCommentForm onAddComment={handleAddComment} />}
    </div>
  );
};
