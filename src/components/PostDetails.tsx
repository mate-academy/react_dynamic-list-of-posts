import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null,
  getUser: (email: string) => string,
};

export const PostDetails: React.FC<Props> = ({ post, getUser }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsAreLoading, setCommentsAreLoading] = useState<boolean>(false);
  const [loadCommentsError, setLoadCommentsError] = useState<boolean>(false);
  const [showNewMessage, setShowNewMessage] = useState<boolean>(false);

  const getComments = useCallback(async (postId: number) => {
    try {
      // setComments([]);
      setShowNewMessage(false);
      setCommentsAreLoading(true);
      const receivedComments = await client.get<Comment[]>('comments');

      setComments(receivedComments.filter(
        comment => comment.postId === postId,
      ));
      setCommentsAreLoading(false);
    } catch {
      setLoadCommentsError(true);
    }
  }, [comments]);

  const handleAddComment = useCallback(async (
    name,
    email,
    comment,
  ) => {
    const newComment: Comment = {
      postId: (post && post.id) || 1,
      id: comments.reduce((acc, curr) => {
        return (acc > curr.id ? acc : curr.id);
      }, 0) + 1,
      name,
      email,
      body: comment,
    };
    const receivedComment = await client.post<Comment>(
      'comments', newComment,
    );

    setComments((previousComments) => [
      ...previousComments,
      receivedComment,
    ]);
  }, [comments]);

  const handleDelete = useCallback(async (commentId: number) => {
    setComments((previousComments) => previousComments.filter(
      comment => comment.id !== commentId,
    ));

    await client.delete(`comments/${commentId}`);
  }, [comments]);

  useEffect(() => {
    if (post) {
      getComments(post.id);
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post && `#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post && post.body}
          </p>
        </div>

        <div className="block">
          { commentsAreLoading && <Loader /> }

          {loadCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length === 0) && (
            <p className="title is-4">Comments:</p>
          )}

          {(comments.length !== 0) && (
            comments.map(comment => (
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
                    {getUser(comment.email)}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => (handleDelete(comment.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowNewMessage(showNewMessage || !showNewMessage)}
          >
            Write a comment
          </button>

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article> */}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>
            <div
              className="message-body"
              data-cy="CommentBody"
            >
              One more comment
            </div>
          </article> */}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {'Multi\nline\ncomment'}
            </div>
          </article> */}

          {/* <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button> */}
        </div>

        {showNewMessage && (
          <NewCommentForm
            handleAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
