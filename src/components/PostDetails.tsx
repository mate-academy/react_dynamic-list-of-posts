import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    commentsApi.getComments(post.id)
      .then(setComments)
      .catch(err => {
        setIsError(true);

        throw err;
      })
      .finally(() => setIsLoading(false));
  }, [post]);

  const showForm = useCallback(() => {
    setIsFormShown(true);
  }, []);

  const handleCommentDeletion = useCallback((id: number) => {
    setComments(currentComments => {
      return currentComments.filter(comment => comment.id !== id);
    });
    commentsApi.deleteComment(id);
  }, []);

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
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading && !isError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!!comments.length && !isLoading && !isError) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({
                name,
                email,
                id,
                body,
              }) => {
                return (
                  <article className="message is-small" data-cy="Comment">
                    <div className="message-header">
                      <a href={email} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleCommentDeletion(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {(!isFormShown && !isLoading && !isError) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={showForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isFormShown && !isLoading && !isError) && (
          <NewCommentForm
            postId={post.id}
            setIsError={setIsError}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
