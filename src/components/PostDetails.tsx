import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import * as commentService from '../api/comments';
import { CommentInfo } from './CommentInfo';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasWarning, setHasWarning] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setHasWarning(false);
    setIsFormActive(false);
    setComments([]);

    commentService
      .getComments(post.id)
      .then(commentsFromServer => {
        if (commentsFromServer.length === 0) {
          setHasWarning(true);
          setComments([]);
        } else {
          setComments(commentsFromServer);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    setHasError(false);

    return commentService
      .deleteComment(commentId)
      .then(() => {
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => {
        if (comments.length <= 1) {
          setHasWarning(true);
        }
      });
  };

  const addNewComment = (newCommentData: CommentData) => {
    return commentService
      .postComment({ postId: post.id, ...newCommentData })
      .then(newComment => {
        setHasWarning(false);
        setComments(curComments => [...curComments, newComment]);
      })
      .catch(error => {
        throw error;
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasWarning && (
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
                  onDelete={handleDeleteComment}
                />
              ))}
            </>
          )}

          {!isLoading && !hasError && !isFormActive && (
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

        {isFormActive && <NewCommentForm onAddComment={addNewComment} />}
      </div>
    </div>
  );
};
