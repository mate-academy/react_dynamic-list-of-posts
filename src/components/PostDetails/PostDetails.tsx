import { FC, useEffect, useState } from 'react';
import './PostDetails.scss';

import { Post, Comment } from '../../types';
import { deleteComment, getCommentsByPostId } from '../../services';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { CommentsList } from '../CommentsList';

interface Props {
  post: Post;
}

export const PostDetails: FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const showNoCommentsMessage =
    !isLoading && !hasCommentsError && !comments.length;

  const isCommentListVisible =
    !isLoading && !hasCommentsError && !!comments.length;

  const showWriteCommentButton =
    !isLoading && !showNewCommentForm && !hasCommentsError;

  const handleDeleteComment = (commentId: Comment['id']) => {
    deleteComment(commentId).then(() =>
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      ),
    );
  };

  useEffect(() => {
    setIsLoading(true);

    getCommentsByPostId(id)
      .then(setComments)
      .catch(() => setHasCommentsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => setShowNewCommentForm(false), [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {showNoCommentsMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentListVisible && (
            <CommentsList
              comments={comments}
              onDeleteComment={handleDeleteComment}
            />
          )}

          {showWriteCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showNewCommentForm && (
          <NewCommentForm postId={id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
