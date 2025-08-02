import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as apiClient from '../api/api';

type Props = {
  post: Post;
  isNewCommentFormOpened: boolean;
  setIsNewCommentFormOpened: (isOpened: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isNewCommentFormOpened,
  setIsNewCommentFormOpened,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .getComments(post.id)
      .then(setComments)
      .catch(() => setIsErrorShown(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const onCommentDelete = (commentToDelete: Comment) => {
    apiClient
      .deleteComment(commentToDelete.id)
      .then(() =>
        setComments(current =>
          current.filter(comment => comment.id !== commentToDelete.id),
        ),
      )
      .catch(() => setIsErrorShown(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}
          {isErrorShown && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !isErrorShown && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isErrorShown && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
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
                      onClick={() => onCommentDelete(comment)}
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

          {!isNewCommentFormOpened && !isErrorShown && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isNewCommentFormOpened && (
          <NewCommentForm
            post={post}
            setComments={setComments}
            setIsErrorShown={setIsErrorShown}
          />
        )}
      </div>
    </div>
  );
};
