import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentServise from '../utils/comments';
import { Comment } from '../types/Comment';
import { errorMessage } from '../utils/errorMessage';

type Props = {
  post: Post;
  areCommentsLoading: boolean;
  setAreCommentsLoading: (arg: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  areCommentsLoading,
  setAreCommentsLoading,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewComment, setIsnewComment] = useState(true);
  const postId = post.id;

  useEffect(() => {
    commentServise.getPostComments(post.id)
      .then(setComments)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setAreCommentsLoading(false);
      });
  }, [post.id, setAreCommentsLoading]);

  const handleDeleteComment = (commentId: number) => {
    setComments(currentComments => currentComments
      .filter(comment => comment.id !== commentId));

    commentServise.deleteComment(commentId)
      .catch(() => {
        setComments(comments);
      });
  };

  const addComment = (name: string, email: string, body: string) => {
    setIsLoading(true);

    return commentServise.createComment({
      name, email, body, postId,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch((error) => {
        setIsnewComment(false);
        setTimeout(() => {
          setIsnewComment(true);
        }, 3000);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          {areCommentsLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length < 1 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteComment(comment.id);
                      }}
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

          {(comments && !isForm) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsForm(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isNewComment && (
          <div
            data-cy="ErrorNotification"
            className={classNames(
              'notification is-danger has-text-weight-bold',
            )}
          >
            {errorMessage}
          </div>
        )}

        {isForm && (
          <NewCommentForm onSubmit={addComment} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
