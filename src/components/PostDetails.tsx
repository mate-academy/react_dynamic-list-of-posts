/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as commentMethods from '../api/comment';

type Props = {
  post?: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isPostCommentsLoading, setIsPostCommentsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWriteCommentButtonVisible, setIsWriteCommentButtonVisible] =
    useState(true);
  const [isNewCommentFormVisible, setIsNewCommentFormVisible] = useState(false);
  const hasNoError = errorMessage === '';

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsPostCommentsLoading(true);

    commentMethods
      .getComments(post.id)
      .then(setComments)
      .catch(error => {
        setErrorMessage('Unable to load comments');
        throw error;
      })
      .finally(() => {
        setIsPostCommentsLoading(false);
      });
  }, [post]);

  const handleWriteCommentButtonClick = () => {
    setIsWriteCommentButtonVisible(false);
    setIsNewCommentFormVisible(true);
  };

  useEffect(() => {
    if (post) {
      setIsNewCommentFormVisible(false);
      setIsWriteCommentButtonVisible(true);
    }
  }, [post]);

  const addComment = async (
    name: string,
    email: string,
    body: string,
  ): Promise<void> => {
    if (!post) {
      return;
    }

    const postId = post.id;

    try {
      const newComment = await commentMethods.createComment({
        postId,
        name,
        email,
        body,
      });

      setComments(currentComments => [...currentComments, newComment]);
    } catch (error) {
      setErrorMessage('Unable add comments!');
      throw error;
    }
  };

  const deleteComment = async (commentId: number): Promise<void> => {
    try {
      await commentMethods.deleteComment(commentId);

      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    } catch (error) {
      setErrorMessage('Unable delete comment(s)!');
      throw error;
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {post && (
          <>
            {isPostCommentsLoading ? (
              <Loader />
            ) : comments.length === 0 && hasNoError ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => {
                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
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
                          onClick={() => deleteComment(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          </>
        )}

        {!hasNoError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isPostCommentsLoading &&
          isWriteCommentButtonVisible &&
          hasNoError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentButtonClick}
            >
              Write a comment
            </button>
          )}
      </div>

      {isNewCommentFormVisible && hasNoError && (
        <NewCommentForm addComment={addComment} />
      )}
    </div>
  );
};
