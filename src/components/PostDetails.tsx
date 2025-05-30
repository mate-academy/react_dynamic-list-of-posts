import React from 'react';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { NewCommentForm, NewCommentFormProps } from './NewCommentForm';
import { Post } from '../types/Post';

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
  isCommentLoading: boolean;
  isCommentError: boolean;
  showCommentForm: boolean;
  setShowCommentForm: (showCommentForm: boolean) => void;
  deleteComment: (comment: Comment) => void;
  newCommentFormProps: NewCommentFormProps;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post: { id, title, body },
  comments,
  isCommentLoading,
  isCommentError,
  showCommentForm,
  setShowCommentForm,
  deleteComment,
  newCommentFormProps,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isCommentLoading && <Loader />}
          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentError && !isCommentLoading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isCommentError && !isCommentLoading && (
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
                      onClick={() => deleteComment(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
              {!showCommentForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setShowCommentForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {!isCommentLoading && showCommentForm && (
          <NewCommentForm {...newCommentFormProps} />
        )}
      </div>
    </div>
  );
};
