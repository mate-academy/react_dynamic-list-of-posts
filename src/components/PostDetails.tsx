import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { addComment, deleteComment, getPostComments } from '../api/api';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  postInfo: Post;
};

export const PostDetails: React.FC<Props> = ({ postInfo }) => {
  const [hasDeleteError, setHasDeleteError] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [hasCommentError, setHasCommentError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasDeleteError(false);
    setHasCommentError(false);
    setIsFormVisible(false);
    setComments([]);

    getPostComments(postInfo.id)
      .then(setComments)
      .catch(() => setHasCommentError(true))
      .finally(() => setIsLoading(false));
  }, [postInfo.id]);

  const handleAddComment = (data: Omit<Comment, 'id'>) => {
    return addComment(data).then(newComment => {
      setComments(current => [...current, newComment]);
    });
  };

  const handleCommentDelete = (commentId: number) => {
    const prevComments = comments;

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setComments(prevComments);
      setHasDeleteError(true);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postInfo.id}: ${postInfo.title}`}</h2>

        <p data-cy="PostBody">{postInfo.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasCommentError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasCommentError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && comments.length !== 0 && (
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
          </>
        )}

        {hasDeleteError && (
          <div className="help is-danger mb-4" data-cy="DeleteError">
            Unable to delete the comment
          </div>
        )}

        {!isLoading && !hasCommentError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoading && !hasCommentError && isFormVisible && (
        <NewCommentForm postId={postInfo.id} onSubmit={handleAddComment} />
      )}
    </div>
  );
};
