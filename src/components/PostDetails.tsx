/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
  const loadComments = async () => {
    setIsLoading(true);
    setHasError(false);
    setComments([]);
    setIsFormVisible(false);

    try {
      const loadedComments = await client.get<Comment[]>(
        `/comments?postId=${post.id}`,
      );

      setComments(loadedComments);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  loadComments();
}, [post.id]);

  const handleAddComment = async (commentData: CommentData) => {
  try {
    const newComment = await client.post<Comment>('/comments', {
      ...commentData,
      postId: post.id,
    });

    setComments(currentComments => [
      ...currentComments,
      newComment,
    ]);
  } catch {
    throw new Error('Unable to add a comment');
  }
};
  const handleDeleteComment = async (commentId: number) => {
  const deletedComment = comments.find(
    comment => comment.id === commentId,
  );

  if (!deletedComment) {
    return;
  }

  setComments(currentComments =>
    currentComments.filter(
      comment => comment.id !== commentId,
    ),
  );

  try {
    await client.delete(`/comments/${commentId}`);
  } catch {
    setComments(currentComments => {
      const commentAlreadyExists = currentComments.some(
        comment => comment.id === deletedComment.id,
      );

      if (commentAlreadyExists) {
        return currentComments;
      }

      return [...currentComments, deletedComment].sort(
        (commentA, commentB) => commentA.id - commentB.id,
      );
    });
  }
};

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Something went wrong
          </div>
        )}

        {!isLoading &&
          !hasError &&
          comments.length === 0 && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

        {!isLoading &&
          !hasError &&
          comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() =>
                        handleDeleteComment(comment.id)
                      }
                    >
                      delete button
                    </button>
                  </div>

                  <div
                    className="message-body"
                    data-cy="CommentBody"
                  >
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

        {!isLoading &&
          !hasError &&
          !isFormVisible && (
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

      {isFormVisible && (
        <NewCommentForm onSubmit={handleAddComment} />
      )}
    </div>
  );
};
