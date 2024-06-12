import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../utils/api';
import { CommentInfo } from './CommentInfo';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const { id, title, body } = post;
  const noPostComments = !comments.length && !isLoader && !showError;
  const hasWriteButton = !isLoader && !isForm && !showError;

  const removeComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setComments(comments);

      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoader(true);
    setComments([]);
    setShowError(false);
    setIsForm(false);

    getPostComments(id)
      .then(setComments)
      .catch(() => setShowError(true))
      .finally(() => setIsLoader(false));
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoader && <Loader />}

          {showError && !isLoader && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noPostComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentInfo
                  key={comment.id}
                  comment={comment}
                  onDelete={removeComment}
                />
              ))}
            </>
          )}

          {hasWriteButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && <NewCommentForm postId={id} updateComments={setComments} />}
      </div>
    </div>
  );
};
