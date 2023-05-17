import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments, removeComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleGetComments = async () => {
      setIsLoading(true);
      try {
        const res = await getComments(selectedPost.id);

        setComments(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsFormOpen(false);
    handleGetComments();
  }, [selectedPost]);

  const handleRemoveComment = async (commentId: number) => {
    setComments(state => state.filter(comment => comment.id !== commentId));
    try {
      await removeComment(commentId);
    } catch {
      setIsError(true);
    }
  };

  const handleClick = () => {
    setIsFormOpen(true);
  };

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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong. Reload page and try again.
                </div>
              )}

              {comments.length === 0 && !isError && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && !isError && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
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
                          onClick={() => handleRemoveComment(comment.id)}
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

              {!isFormOpen && !isError && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleClick}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            setIsError={setIsError}
            postId={selectedPost.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
