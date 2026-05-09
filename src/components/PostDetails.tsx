import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      setCommentsError(false);
      setIsFormVisible(false);
      setComments([]);

      try {
        const loadedComments = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(loadedComments);
      } catch {
        setCommentsError(true);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    client.delete(`/comments/${commentId}`);
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
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

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !commentsError && comments.length > 0 && (
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

        {!isLoadingComments && !commentsError && (
          <>
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

            {isFormVisible && (
              <NewCommentForm
                postId={post.id}
                onAddComment={handleAddComment}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
