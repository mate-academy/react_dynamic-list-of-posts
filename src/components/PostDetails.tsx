import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const loadComments = () => {
    setIsLoading(true);
    setPostErrorMessage(null);
    setComments([]);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(loadedComments => {
        if (!Array.isArray(loadedComments)) {
          throw new Error('Invalid response format');
        }

        setComments(loadedComments);
      })
      .catch(e => {
        setPostErrorMessage(e.message);
        setComments([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      setPostErrorMessage('Failed to delete comment');
      loadComments();
    });
  };

  const handleAddComment = async (commentData: CommentData) => {
    try {
      const newComment = await client.post<Comment>(`/comments`, {
        ...commentData,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, newComment]);
      setPostErrorMessage(null);
      setIsFormVisible(false);
    } catch (error) {
      setPostErrorMessage('Failed to add comment');
    }
  };

  useEffect(() => {
    loadComments();
    setIsFormVisible(false);
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && postErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {postErrorMessage}
            </div>
          )}

          {!isLoading && !postErrorMessage && comments.length === 0 && (
            <div
              className="notification is-warning"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </div>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

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

          {!isFormVisible && !isLoading && postErrorMessage === null && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && <NewCommentForm onSubmit={handleAddComment} />}
      </div>
    </div>
  );
};
