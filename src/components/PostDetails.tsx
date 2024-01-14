import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from '../store/PostContext';
import { CommentsContext } from '../store/CommentsContext';
import { CommentItem } from './CommentItem';

export const PostDetails: React.FC = () => {
  const [isCreateComment, setIsCreateComment] = useState(false);
  const { selectedPost } = useContext(PostContext);
  const {
    comments,
    loadComments,
    isCommentsLoading,
    errorCommentsMessage,
  } = useContext(CommentsContext);

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost.id);
    }
  }, [selectedPost, loadComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost?.id} ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && (<Loader />)}

          {errorCommentsMessage !== '' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!isCommentsLoading && comments.length === 0 && selectedPost) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(selectedPost && comments.length !== 0) && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map(comment => (
            <CommentItem comment={comment} key={comment.id} />
          ))}

          {isCreateComment ? (
            <NewCommentForm />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCreateComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
