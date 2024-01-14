import React, { useEffect, useState } from 'react';

import * as commentService from '../services/comment';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isWrittingComment, setIsWrittingComment] = useState(false);

  const isHasComments = !hasCommentsError && !!comments.length && !loading;
  const noComments = !hasCommentsError && !comments.length && !loading;

  function loadComments() {
    setIsWrittingComment(false);

    setLoading(true);
    setHasCommentsError(false);

    commentService.getCommemts(post.id)
      .then(setComments)
      .catch((error) => {
        setHasCommentsError(true);
        throw error;
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadComments, [post]);

  const addComment = (newComment: CommentData) => {
    setHasCommentsError(false);
    setIsSubmiting(true);

    const newCommentForAdd = { ...newComment, postId: post.id };

    return commentService.createComment(newCommentForAdd)
      .then(comment => {
        setComments(currentComments => [...currentComments, comment]);
      })
      .catch((error) => {
        setHasCommentsError(true);
        throw error;
      })
      .finally(() => setIsSubmiting(false));
  };

  const handleDeleteComment = (commentId: number) => {
    setHasCommentsError(false);

    setComments(currentComments => currentComments
      .filter(comment => comment.id !== commentId));

    return commentService.deleteComment(commentId)
      .catch((error) => {
        setComments(comments);
        setHasCommentsError(true);
        throw error;
      });
  };

  const handleOpenForm = () => {
    setIsWrittingComment(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isHasComments && (
            <>
              <p className="title is-4">Comments:</p>
              {comments?.map(comment => (
                <article className="message is-small" data-cy="Comment">
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
            </>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!loading && !isWrittingComment) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isWrittingComment && !loading) && (
          <NewCommentForm
            onSubmit={addComment}
            isSubmiting={isSubmiting}
          />
        )}
      </div>
    </div>
  );
};
