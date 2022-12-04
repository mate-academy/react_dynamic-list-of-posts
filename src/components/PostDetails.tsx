import React, { useEffect, useState } from 'react';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const loadComments = () => {
    setIsLoaded(false);
    setIsError(false);
    setIsVisibleForm(false);

    commentsApi.getPostComments(post.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  };

  useEffect(loadComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(
        currentComments => [...currentComments, newComment],
      );
    } catch (error) {
      setIsError(true);
    }
  };

  const deleteComment = async (deleteCommentId: number) => {
    setComments(
      currentComments => currentComments.filter(
        comment => comment.id !== deleteCommentId,
      ),
    );

    await commentsApi.deleteComment(deleteCommentId);
  };

  return (
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
        {!isLoaded && (
          <Loader />
        )}

        {isLoaded && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !isError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
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
                    onClick={() => deleteComment(comment.id)}
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

        {isLoaded && !isError && !isVisibleForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsVisibleForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isLoaded && !isError && isVisibleForm && (
        <NewCommentForm
          addComment={addComment}
        />
      )}
    </div>
  );
};
