import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

interface Props {
  currentPost: Post;
}

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsOpen(false);
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await client.get<Comment[]>(
          `/comments?postId=${currentPost.id}`,
        );

        setComments(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [currentPost]);

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      try {
        await client.delete(`/comments/${commentId}`);

        setComments(prev => prev.filter(comment => comment.id !== commentId));
      } catch (error) {
        throw new Error('Unsuccessful delete');
      }
    },
    [setComments],
  );

  const handleAddComment = useCallback(
    async (comment: Omit<Comment, 'id' | 'postId'>) => {
      try {
        const postComment = { ...comment, postId: currentPost.id } as Comment;

        await client.post(`/comments/`, postComment);

        setComments(prev => [...prev, postComment]);
      } catch (error) {
        throw new Error('Unsuccessful delete');
      }
    },
    [setComments, currentPost.id],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{currentPost.id}: {currentPost.title}
          </h2>

          <p data-cy="PostBody">{currentPost.body}</p>
        </div>
        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && comments.length > 0 && (
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

          {!isOpen && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isOpen && <NewCommentForm handleAddComment={handleAddComment} />}
      </div>
    </div>
  );
};
