import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getComment } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [isAddingComments, setIsAddingComments] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      setCommentsError('');

      try {
        const loadedComments = await getComment(post.id);

        setComments(loadedComments);
      } catch {
        setCommentsError('Something went wrong');
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
    setIsAddingComments(false);
  }, [post.id]);

  const handleAddComment = async (newComment: Comment) => {
    try {
      await addComment(newComment);
      setComments(prevComments => [...prevComments, newComment]);
    } catch {
      setCommentsError('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prevComment =>
        prevComment.filter(comment => comment.id !== commentId),
      );
    } catch {
      setCommentsError('Failed to delete comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{post.title}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}
          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          )}
          {comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!commentsError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <>
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
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                </>
              ))}
            </>
          )}
          {!isAddingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddingComments(true)}
            >
              Write a comment
            </button>
          )}

          {isAddingComments && (
            <NewCommentForm postId={post.id} addComment={handleAddComment} />
          )}
        </div>
      </div>
    </div>
  );
};
