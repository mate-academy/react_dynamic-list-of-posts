// #region imports
import React, { memo, useCallback, useEffect, useState } from 'react';
import { CommentsList } from './CommentsList';
import { ErrorNotification } from './ErrorNotification';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getPostComments } from '../services/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
// #endregion

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = memo(function PostDetails({
  post,
}) {
  // #region states
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [deletingErrorPostIds, setDeletingErrorPostIds] = useState<number[]>(
    [],
  );
  const [isFormCommentOpen, setIsFormCommentOpen] = useState(false);
  // #endregion

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsLoading(true);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  // #region comments handlings
  const handleCommentDelete = useCallback(
    (id: number) => {
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== id),
      );

      deleteComment(id).catch(() => {
        setDeletingErrorPostIds(currentIds => [...currentIds, id]);
        setComments(comments);
      });
    },
    [comments],
  );

  const handleCommentAdd = useCallback((newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  }, []);
  // #endregion

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isLoadingError && (
            <ErrorNotification errorMessage="Something went wrong" />
          )}

          {!isLoading &&
            !isLoadingError &&
            (!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <CommentsList
                comments={comments}
                onDelete={handleCommentDelete}
                deletingErrorPostIds={deletingErrorPostIds}
              />
            ))}

          {!isFormCommentOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsFormCommentOpen(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {post && isFormCommentOpen && (
          <NewCommentForm postId={post.id} onCommentAdding={handleCommentAdd} />
        )}
      </div>
    </div>
  );
});
