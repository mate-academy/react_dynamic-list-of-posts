import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as serverAction from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCreateComment, setIsCreateComment] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const loadComments = () => {
    if (post && !isError) {
      setIsCreateComment(false);
      setIsLoading(true);

      serverAction
        .getComments(post.id)
        .then(result => {
          const results = result.map(comment => ({
            id: comment.id,
            postId: comment.postId,
            name: comment.name,
            body: comment.body,
            email: comment.email,
          }));

          setComments(results);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    loadComments();
  }, [post, isError]);

  const deleteComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    serverAction.deleteComment(commentId).catch(() => {
      setIsDeleteError(true);
      setTimeout(() => {
        setIsDeleteError(false);
      }, 3000);
    });
  };

  const addComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {isDeleteError && (
                <div className="notification is-danger">
                  You cann&apos;t delete comment!
                </div>
              )}

              {comments.length === 0 && !isError && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && (
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

              {!isCreateComment && !isError && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCreateComment(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isCreateComment && post && (
          <NewCommentForm postId={post.id} addComment={addComment} />
        )}
      </div>
    </div>
  );
};
