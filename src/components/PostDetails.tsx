import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm/NewCommentForm';
import { deleteComment, getComments } from '../services/api';
import { CommentBox } from './Comment';

interface Props {
  selectedPost: Post | null;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [commentsOfPost, setCommentsOfPost] = useState<Comment[] | null>(null);

  const [isErrorShowing, setIsErrorShowing] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isFormShowing, setIsFormShowing] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    setIsErrorShowing(false);

    deleteComment(commentId)
      .then(() => {
        setCommentsOfPost((prevComments: Comment[] | null) => {
          if (prevComments) {
            return prevComments.filter(comment => comment.id !== commentId);
          }

          return null;
        });
      })
      .catch(() => setIsErrorShowing(true));
  };

  useEffect(() => {
    if (selectedPost) {
      getComments(
        selectedPost.id,
        setCommentsOfPost,
        setIsCommentsLoading,
        setIsErrorShowing,
      );
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isErrorShowing && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {commentsOfPost && (
            <>
              {commentsOfPost.length > 0 ? (
                <>
                  <p className="title is-4">Comments:</p>

                  {commentsOfPost.map(comment => (
                    <CommentBox
                      comment={comment}
                      handleDeleteComment={handleDeleteComment}
                      key={comment.id}
                    />
                  ))}
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
            </>
          )}

          {!isFormShowing && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShowing(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShowing && (
          <NewCommentForm
            selectedPost={selectedPost}
            setCommentsOfPost={setCommentsOfPost}
            setIsErrorShowing={setIsErrorShowing}
          />
        )}
      </div>
    </div>
  );
};
