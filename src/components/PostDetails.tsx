import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
  comments: Comment[];
  commentLoading: boolean;
  commentLoadingError: boolean;
  onDeleteComments: (comment: Comment) => void;
  onSubmitComments: (comment: Comment) => void;
  submitLoading: boolean;
  addCommentError: boolean;
  lastCommentPayload: Omit<Comment, 'id'> | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  commentLoading,
  commentLoadingError,
  onDeleteComments,
  onSubmitComments,
  submitLoading,
  addCommentError,
  lastCommentPayload,
}) => {
  const [writeComment, setWriteComment] = useState(false);

  useEffect(() => {
    setWriteComment(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {commentLoading && <Loader />}

        {commentLoadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentLoading &&
          !commentLoadingError &&
          (comments.length === 0 ? (
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
                      onClick={() => onDeleteComments(comment)}
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
          ))}

        {!commentLoading && !commentLoadingError && !writeComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setWriteComment(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!commentLoading && writeComment && !commentLoadingError && (
        <NewCommentForm
          post={post}
          onSubmitComments={onSubmitComments}
          submitLoading={submitLoading}
          addCommentError={addCommentError}
          lastCommentPayload={lastCommentPayload}
        />
      )}
    </div>
  );
};
