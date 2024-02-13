import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getCommentsByPostId } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsCommenting(false);

    getCommentsByPostId(selectedPost.id)
      .then((res) => {
        if ('error' in res) {
          throw new Error();
        }

        setComments(res);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  const handleCommentDeletion = (commentId: number) => {
    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .then((res) => {
        if ('error' in (res as object)) {
          throw new Error();
        }
      })
      .catch(() => setHasError(true));
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
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !hasError && (
            <>
              {comments.length > 0 ? (
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
                          onClick={() => handleCommentDeletion(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                        {/* {'Multi\nline\ncomment'} */}
                      </div>
                    </article>
                  ))}
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
              {!isCommenting && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCommenting(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}

        </div>

        {isCommenting && !hasError && (
          <NewCommentForm
            currentPostId={selectedPost.id}
            onCommentAdd={setComments}
            onError={setHasError}
          />
        )}
      </div>
    </div>
  );
};
