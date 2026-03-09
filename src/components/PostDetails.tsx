import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comments } from '../types/Comment';

type PostInfo = {
  data: Post | null;
  loadingState: boolean;
  error: string;
  onError: (value: string) => void;
  comments: Comments[];
  onAddComment: (comment: Comments) => void;
  onDeleteComment: (id: number) => void;
  postId: number;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

export const PostDetails: React.FC<PostInfo> = ({
  data,
  loadingState,
  error,
  onError,
  comments,
  postId,
  isVisible,
  setIsVisible,
  onAddComment,
  onDeleteComment,
}) => {

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{data?.title}</h2>
        <p data-cy="PostBody">{data?.body}</p>
      </div>

      <div className="block">
        {loadingState && <Loader />}

        {!loadingState && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loadingState && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loadingState && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
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
                    onClick={() => onDeleteComment(comment.id)}
                  />
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loadingState && !error && isVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsVisible(false)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isVisible && (
        <NewCommentForm
          currentPost={postId}
          onAdd={onAddComment}
          setError={onError}
        />
      )}
    </div>
  );
};
