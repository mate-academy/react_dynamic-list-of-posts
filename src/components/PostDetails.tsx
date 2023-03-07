import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import {
  getCommentsByPostId,
  postComment,
  deleteCommentById,
} from '../api/comments';
import { CommentItem } from './Comment';

type PropTypes = {
  selectedPost: Post;
};

export const PostDetails: React.FC<PropTypes> = ({
  selectedPost,
}) => {
  const { id: postId, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isInputUpdating, setInputIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => setIsFormVisible(false), [postId]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByPostId(postId)
      .then(receivedComments => {
        setComments(receivedComments);
      })
      .catch(() => {
        throw new Error('123');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  const addComment = (newComment: CommentData) => {
    setInputIsUpdating(true);
    const tempComment = {
      id: 0,
      postId,
      ...newComment,
    };

    return postComment(tempComment)
      .then(postedComment => {
        setComments(prev => [...prev, postedComment]);
      })
      .catch(() => {
        throw new Error('123');
      })
      .finally(() => {
        setInputIsUpdating(false);
      });
  };

  const deleteComment = (commentId: number) => {
    setComments(prev => (
      prev.filter(comment => comment.id !== commentId)
    ));
    deleteCommentById(commentId)
      .catch(() => {
        throw new Error('123');
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postId}: ${title}`}
          </h2>
          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        {isLoading
          ? (<Loader />)
          : (
            <div className="block">
              {!comments.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>
                    {comments.map(comment => (
                      <CommentItem
                        comment={comment}
                        deleteComment={deleteComment}
                        key={comment.id}
                      />
                    ))}
                  </>
                )}

              {!isFormVisible && (
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
          )}

        {isFormVisible && (
          <NewCommentForm
            addComment={addComment}
            isInputUpdating={isInputUpdating}
          />
        )}
      </div>
    </div>
  );
};
