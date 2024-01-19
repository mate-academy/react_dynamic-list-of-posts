import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/comments';
import { CommentCard } from './Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);

  const noCommentCondtion = (
    !arePostsLoading
    && !isLoadingError
    && comments.length === 0
  );

  const showCommentsCondition = (
    !arePostsLoading
    && !isLoadingError
    && comments.length > 0
  );

  const loadComments = useCallback(async () => {
    setArePostsLoading(true);

    try {
      const loadedComments = await getComments(post.id);

      setComments(loadedComments);
      setIsLoadingError(false);
    } catch {
      setIsLoadingError(true);
    } finally {
      setArePostsLoading(false);
    }
  }, [post.id]);

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setComments(prevComments => (
        prevComments.filter(comment => comment.id !== commentId)
      ));
    } catch {
      setIsLoadingError(true);
    }
  };

  const handleCreateComment = async (newComment: CommentData) => {
    setIsCommentLoading(true);

    try {
      const newPost = await addComment({
        ...newComment,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, newPost]);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    setIsWritingComment(false);
  }, [loadComments]);

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
          {arePostsLoading && <Loader />}

          {!arePostsLoading && isLoadingError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {noCommentCondtion && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {showCommentsCondition && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  handleCommentDelete={handleCommentDelete}
                />
              ))}
            </>
          )}

          {!isWritingComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isWritingComment && !isLoadingError) && (
          <NewCommentForm
            handleCreateComment={handleCreateComment}
            isCommentLoading={isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
