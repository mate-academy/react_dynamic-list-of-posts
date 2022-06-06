import React, { useState, useEffect } from 'react';
import {
  addComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(data => setPostDetails(data));
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(data => setComments(data));
  }, [selectedPostId]);

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
    addComment(newComment);
  };

  const handleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const toggleBtn = () => {
    return (!isVisible && comments.length > 0)
      ? `Show ${comments.length} comments`
      : `Hide ${comments.length} comments`;
  };

  return (
    <div className="PostDetails">
      {selectedPostId
        ? (
          <>
            <h2>
              Post details:
              {postDetails?.userId}
            </h2>

            <section className="PostDetails__post">
              <p>{postDetails?.title}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length > 0
                ? (
                  <button
                    type="button"
                    className="button"
                    onClick={handleIsVisible}
                    data-cy="postDetails"
                  >
                    {toggleBtn()}
                  </button>
                ) : (
                  <p>No comments yet</p>
                )}
              {isVisible && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li
                      className="PostDetails__list-item"
                      key={comment.id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPostId={selectedPostId}
                  commentsLength={comments.length}
                  handleAddComment={handleAddComment}
                />
              </div>
            </section>
          </>
        )
        : (
          <p>No details yet</p>
        )}
    </div>
  );
};
