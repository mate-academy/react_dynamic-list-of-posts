import React, { useEffect, useState } from 'react';
import { createComment, deleteComment, getComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  selectedPost: Post,
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const loadComments = async () => {
    setIsVisible(false);
    setIsLoaded(true);
    try {
      const loadedcomments = await getComments(selectedPost.id);

      setComments(loadedcomments);
    } catch {
      setHasError(true);
    } finally {
      setIsLoaded(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const filteredComments = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(filteredComments);
    await deleteComment(commentId);
  };

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      setComments(
        currentComments => [...currentComments, newComment],
      );
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    loadComments();
  }, [selectedPost.id]);

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
          { isLoaded && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoaded && comments.length > 0 && (
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
                      onClick={() => {
                        handleDeleteComment(comment.id);
                      }}
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

          {!isLoaded && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsVisible(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isLoaded && !hasError && isVisible && (
          <NewCommentForm addComment={addComment} />
        )}
      </div>
    </div>
  );
};
