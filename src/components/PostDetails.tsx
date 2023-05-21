import React, { useState, useEffect } from 'react';
import { CommentsList } from './CommentsList';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments, deleteComment } from '../api/posts';

type Props = {
  activePost: Post,
};

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const [isFindComments, setIsFindComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | []>([]);
  const [commentToRemove, setCommentToRemove] = useState<Comment | null>(null);
  const [isError, setIsError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isRemovingComment, setIsRemovingComment] = useState(false);
  const getPostComments = async (post: Post) => {
    setIsError(false);
    setIsFindComments(true);

    try {
      const response = await getComments(post.id);

      setPostComments(response);
    } catch {
      setIsError(true);
    } finally {
      setIsFindComments(false);
    }
  };

  const removeComment = async (comment: Comment) => {
    setIsRemovingComment(true);
    setIsDeleteError(false);

    try {
      await deleteComment(comment.id, activePost.id);

      setPostComments(
        postComments.filter(activeComment => activeComment.id !== comment.id),
      );
    } catch {
      setIsDeleteError(true);
      setTimeout(() => setIsDeleteError(false), 2500);
    } finally {
      setIsRemovingComment(false);
    }
  };

  const handleRemovingComment = (comment: Comment) => {
    setCommentToRemove(comment);
    removeComment(comment);
  };

  useEffect(() => {
    getPostComments(activePost);
    setIsFormActive(false);
  }, [activePost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${activePost.id}: ${activePost.title}`}
          </h2>

          <p data-cy="PostBody">
            {activePost.body}
          </p>
        </div>

        <div className="block">
          {isFindComments && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(postComments.length < 1 && !isFindComments && !isError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!isFindComments && !isError && postComments.length > 0) && (
            <>
              <p className="title is-4">Comments:</p>

              <CommentsList
                postComments={postComments}
                commentToRemove={commentToRemove}
                handleRemovingComment={handleRemovingComment}
                isRemovingComment={isRemovingComment}
              />
            </>
          )}

          {isDeleteError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!isFindComments && !isError && !isFormActive) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm
            activePostId={activePost.id}
            postComments={postComments}
            setPostComments={comment => setPostComments(comment)}
          />
        )}
      </div>
    </div>
  );
};
