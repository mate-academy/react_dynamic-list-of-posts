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

type PropTypes = {
  selectedPost: Post;
};

export const PostDetails: React.FC<PropTypes> = ({
  selectedPost,
}) => {
  const { id: postId, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isInputUpdating, setInputIsUpdating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

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
                    {comments.map(comment => {
                      const {
                        name,
                        email,
                        body: commentBody,
                        id,
                      } = comment;

                      return (
                        <article className="message is-small" data-cy="Comment">
                          <div className="message-header">
                            <a href={`mailto:${email}`} data-cy="CommentAuthor">
                              {name}
                            </a>
                            <button
                              data-cy="CommentDelete"
                              type="button"
                              className="delete is-small"
                              aria-label="delete"
                              onClick={() => {
                                deleteComment(id);
                              }}
                            >
                              delete button
                            </button>
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {commentBody}
                          </div>
                        </article>
                      );
                    })}
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
