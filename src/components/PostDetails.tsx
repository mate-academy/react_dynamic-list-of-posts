import React, { useEffect, useState } from 'react';
import { getComments, sendComment, deleteComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentList } from './CommentsList';

export type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isWillNewComment, setIsWillNewComment] = useState(false);

  const [newComment, setNewComment] = useState<CommentData | null>();
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  async function loadComments() {
    setIsLoadingComments(true);

    try {
      const commentsFromServer = await getComments(post.id);

      setComments(commentsFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoadingComments(false);
    }
  }

  useEffect(() => {
    setComments([]);
    loadComments();
    setIsWillNewComment(false);
  }, [post]);

  async function sendNewCommentToServer(comment: CommentData) {
    setIsLoadingNewComment(true);

    try {
      const commentToServer: Omit<Comment, 'id'> = {
        ...comment,
        postId: post.id,
      };

      const sendedComment = await sendComment(commentToServer);

      setComments([
        ...comments,
        sendedComment,
      ]);
    } catch {
      throw new Error('can not load new comment from server');
    } finally {
      setIsLoadingNewComment(false);
    }
  }

  useEffect(() => {
    if (newComment) {
      sendNewCommentToServer(newComment);
    }
  }, [newComment]);

  const onDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch {
      throw new Error('can not delete comment');
    }
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
          {isLoadingComments && <Loader />}

          {comments && !isLoadingComments && (
            <CommentList
              comments={comments}
              onDeleteComment={onDeleteComment}
            />
          )}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isWillNewComment && !isLoadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWillNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWillNewComment && (
          <NewCommentForm
            onChangeComment={setNewComment}
            isLoading={isLoadingNewComment}
          />
        )}
      </div>
    </div>
  );
};
