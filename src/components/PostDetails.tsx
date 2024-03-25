import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments, sendComment } from '../api/comment';
import { Comment } from '../types/Comment';
import { CommentList } from './CommentList';

type Props = {
  currentPost: Post;
};

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasNewCommentForm, setHasNewCommentForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const {
    id: currentPostId,
    title: currentPostTitle,
    body: currentPostBody,
  } = currentPost;

  useEffect(() => {
    if (!currentPost) {
      return;
    }

    setIsCommentsLoading(true);
    setHasNewCommentForm(false);

    getComments(currentPostId)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [currentPost, currentPostId]);

  const handleDelete = (commentId: number) => {
    setComments(prevComments => {
      const workComments = [...prevComments];

      const index = workComments.findIndex(comment => comment.id === commentId);

      workComments.splice(index, 1);

      return workComments;
    });

    deleteComment(commentId).catch(() => setHasError(true));
  };

  const addCommentOnServer = (newComment: Comment) => {
    return sendComment(newComment)
      .then(newFromServerComment => {
        setComments(prevComments => [...prevComments, newFromServerComment]);
      })
      .catch(() => setHasError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${currentPostId}: ${currentPostTitle}`}</h2>

          <p data-cy="PostBody">{currentPostBody}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!hasError && !isCommentsLoading && comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!hasError && comments?.length > 0 && (
            <CommentList comments={comments} handleDelete={handleDelete} />
          )}

          {!hasNewCommentForm && !isCommentsLoading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasNewCommentForm && (
          <NewCommentForm
            postId={currentPostId}
            addCommentOnServer={addCommentOnServer}
          />
        )}
      </div>
    </div>
  );
};
