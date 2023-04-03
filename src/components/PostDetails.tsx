import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [commentFormIsActive, setCommentFormIsActive] = useState(false);
  const [hasCommentDeleteError, setHasCommentDeleteError] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    setCommentFormIsActive(false);

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setHasCommentsError(true))
      .finally(() => setIsLoadingComments(false));
  }, [selectedPost]);

  const noCommentsWarn
    = !hasCommentsError && !comments.length && !isLoadingComments;

  const handleCommentDelete = (id: number) => {
    setHasCommentDeleteError(false);

    deleteComment(id)
      .then(() => setComments(prev => prev.filter(
        comment => comment.id !== id,
      )))
      .catch(() => setHasCommentDeleteError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noCommentsWarn && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {!isLoadingComments && comments.map(comment => (
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
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!commentFormIsActive && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCommentFormIsActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasCommentDeleteError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Can`t delete a comment
          </div>
        )}

        {commentFormIsActive && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
