import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';

interface Props {
  selectedPost: Post;
  isNewCommentFormShown: boolean;
  setIsNewCommentFormShown: (value: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isNewCommentFormShown,
  setIsNewCommentFormShown,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);

  const areThereComments = useMemo(() => {
    return comments.length !== 0;
  }, [comments]);

  const handleDelete = useCallback((commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId);
  }, []);

  useEffect(() => {
    setIsCommentsError(false);
    setComments([]);
    setAreCommentsLoading(true);
    getComments(selectedPost.id)
      .then(data => {
        setComments(data);
      })
      .catch(error => {
        setIsCommentsError(true);
        throw error;
      })
      .finally(() => {
        setAreCommentsLoading(false);
      });
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {areCommentsLoading ? (
            <Loader />
          ) : isCommentsError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : (
            <>
              {areThereComments ? (
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
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {isNewCommentFormShown ? (
                <NewCommentForm
                  postId={selectedPost.id}
                  setComments={setComments}
                  setIsCommentsError={setIsCommentsError}
                />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsNewCommentFormShown(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
