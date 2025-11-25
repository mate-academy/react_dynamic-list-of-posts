import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface PostDetailsProps {
  selectedPost: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string>('');
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [deletingCommentIds, setDeletingCommentsIds] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedPost) {
      setComments([]);
      setCommentsError('');
      setIsCommentFormVisible(false);

      return;
    }

    const postId = selectedPost.id;

    setComments([]);
    setCommentsError('');
    setIsCommentFormVisible(false);

    const loadComments = async () => {
      setIsCommentsLoading(true);

      try {
        const fetchedComments = await client.get<Comment[]>(
          `/posts/${postId}/comments`,
        );

        setComments(fetchedComments);
      } catch (err) {
        setCommentsError('Unable to load comments');
      } finally {
        setIsCommentsLoading(false);
      }
    };

    loadComments();
  }, [selectedPost]);

  if (!selectedPost) {
    return null;
  }

  const { id: postId, title, body } = selectedPost;

  const handleAddComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
    setIsCommentFormVisible(false);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    setDeletingCommentsIds(prevIds => [...prevIds, commentId]);

    client
      .delete(`/comments/${commentId}`)
      .catch(() => {
        setCommentsError('Failed to delete a comment');
      })
      .finally(() => {
        setDeletingCommentsIds(prevIds =>
          prevIds?.filter(id => id !== commentId),
        );
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{title}</h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {commentsError}
          </div>
        )}

        {!isCommentsLoading && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && !isCommentsLoading && !commentsError && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className={classNames('message is-small', {
                  'is-loading': deletingCommentIds.includes(comment.id),
                })}
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
                    disabled={deletingCommentIds.includes(comment.id)}
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

        {!isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsCommentFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isCommentFormVisible && (
        <NewCommentForm postId={postId} onAddComment={handleAddComment} />
      )}
    </div>
  );
};
