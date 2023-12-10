import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, getComments, deleteComment } from '../helpers/users';
import { CommentItem } from './CommentItem';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostLoading, setArePostLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);

  const loadComments = useCallback(async () => {
    setArePostLoading(true);

    try {
      setIsLoadingError(false);
      const loadedComments = await getComments(post.id);

      setComments(loadedComments);
    } catch {
      setIsLoadingError(true);
    } finally {
      setArePostLoading(false);
    }
  }, [post.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments, post.id]);

  const handleOpenForm = () => {
    setIsWritingComment(!isWritingComment);
    setIsFormVisible(true);
  };

  const handleDeleteComment = async (commentId: number) => {
    setIsCommentLoading(false);

    try {
      const newComments = comments.filter(comment => comment.id !== commentId);

      setComments(newComments);
      await deleteComment(commentId);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleCommentCreate = async (newComment: CommentData) => {
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
  }, [loadComments, post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}:${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {arePostLoading && <Loader />}

          {!arePostLoading && isLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map(comment => (
            <CommentItem
              comment={comment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}

          {(!isFormVisible) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenForm}
            >
              Write a comment
            </button>
          )}

          {(!isLoadingError && isWritingComment) && (
            <NewCommentForm
              handleCommentCreate={handleCommentCreate}
              isCommentLoading={isCommentLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
