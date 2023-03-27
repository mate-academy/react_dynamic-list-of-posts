/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import {
  deleteCommentfromPost,
  getCommentsfromPost,
} from '../utils/fetchClient';
import { CommentCard } from './CommentCard';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type PostdetailsProps = {
  selectedPost: Post
};

export const PostDetails: React.FC<PostdetailsProps> = ({
  selectedPost,
}) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentsAreLoading, setCommentsAreLoading] = useState(false);
  const [loadingCommsError, setLoadingCommsError] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setCommentsAreLoading(true);
    getCommentsfromPost(selectedPost.id)
      .then((data) => {
        if (data.length > 0) {
          setComments(data);
        }
      })
      .catch(() => setLoadingCommsError(true))
      .finally(() => setCommentsAreLoading(false));
  }, [selectedPost]);

  const handleCommentDelete = (commentId: number) => {
    deleteCommentfromPost(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {commentsAreLoading && (
            <Loader />
          )}
          {loadingCommsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!commentsAreLoading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!commentsAreLoading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment) => (
                <CommentCard
                  comment={comment}
                  onDeleteComment={handleCommentDelete}
                />
              ))}
            </>
          )}

          {isWriting
            ? (
              <NewCommentForm />
            )
            : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsWriting(true);
                }}
              >
                Write a comment
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
