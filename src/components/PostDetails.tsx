import React, { useCallback, useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [hasError, setHasError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getComments = useCallback(() => {
    setIsLoading(true);
    client.get<Comment[]>(`/comments?postId=${post?.id}`)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  useEffect(() => {
    setIsFormOpen(false);
    getComments();
  }, []);

  const openFormHandler = useCallback(() => {
    setIsFormOpen(prevValue => !prevValue);
  }, []);

  const handleDelete = useCallback((commentId: number) => {
    client.delete(`/comments/${commentId}`);
    setComments(prevValue => prevValue.filter(el => el.id !== commentId));
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        {!isLoading
          ? (
            <div className="block">

              {hasError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!hasError && (!comments.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )
                : (<p className="title is-4">Comments:</p>))}

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => handleDelete(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!isFormOpen && !hasError && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={openFormHandler}
                >
                  Write a comment
                </button>
              )}
            </div>
          )
          : (<Loader />)}

        {isFormOpen && (
          <NewCommentForm
            postId={post.id}
            onUpdate={getComments}
          />
        )}
      </div>
    </div>
  );
};
