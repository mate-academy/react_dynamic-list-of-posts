/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  createComment,
  deleteComment,
  getComments,
} from '../services/comment.service';
import { Comment, CommentData, CommentError } from '../types/Comment';
import PropTypes from 'prop-types';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CommentError | ''>('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setShowCommentForm(false);

    getComments(post.id)
      .then(res => setComments(res))
      .catch(() => setError(CommentError.FETCHING))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(curComments =>
        curComments.filter(com => com.id !== commentId),
      );

      await deleteComment(commentId);
    } catch (e) {
      setComments(comments);
      setError(CommentError.DELETING);
    }
  };

  const handleAddComment = async (comment: CommentData) => {
    try {
      const createdComment = await createComment({
        ...comment,
        postId: post.id,
      });

      setComments(curComments => [...curComments, createdComment]);
    } catch (e) {
      throw e;
    }
  };

  const handleClearForm = () => {
    setFormKey(curState => curState + 1);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && error === CommentError.FETCHING && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {!isLoading &&
          post &&
          error !== CommentError.FETCHING &&
          comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {!isLoading &&
          post &&
          error !== CommentError.FETCHING &&
          comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {error === CommentError.DELETING && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {error}
                </div>
              )}
            </>
          )}
        {!isLoading &&
          post &&
          error !== CommentError.FETCHING &&
          !showCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowCommentForm(true)}
            >
              Write a comment
            </button>
          )}
      </div>

      {showCommentForm && (
        <NewCommentForm
          key={`new-comment-form-${formKey}`}
          onClear={handleClearForm}
          onSubmit={handleAddComment}
        />
      )}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
