import React from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../CommentForm/NewCommentForm';
import { Comment, CommentData } from '../../types/Comment';
import { Post } from '../../types/Post';

type Props = {
  comments: Comment[];
  isCommentsLoading: boolean;
  isAddingCommentFailed: boolean;
  post: Post | null;
  onCommentAdded: (comment: CommentData) => void;
  onCommentDeleted: (commentId: number) => void;
  isAddingComment: boolean;
  commentsLoadingErrorMessages: string;
  onCommentWriteButtonCLick: () => void;
  isWritingComment: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  isCommentsLoading,
  isAddingCommentFailed,
  post,
  onCommentAdded,
  onCommentDeleted,
  isAddingComment,
  commentsLoadingErrorMessages,
  onCommentWriteButtonCLick,
  isWritingComment,
}) => {

  if (!post) {
    return null;
  }

  const isCommentsMissed =
    !isCommentsLoading &&
    !isAddingCommentFailed &&
    comments.length === 0 &&
    !commentsLoadingErrorMessages;
  const isCommentsPresent =
    !isCommentsLoading &&
    !isAddingCommentFailed &&
    comments.length > 0 &&
    !commentsLoadingErrorMessages;

  const isButtonShown =
    !isCommentsLoading && !isWritingComment && !commentsLoadingErrorMessages;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {!isCommentsLoading && isAddingCommentFailed && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong while adding a comment
          </div>
        )}

        {!isCommentsLoading && commentsLoadingErrorMessages && (
          <div className="notification is-danger" data-cy="CommentsError">
            {commentsLoadingErrorMessages}
          </div>
        )}

        {isCommentsMissed && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsPresent && (
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
                    onClick={() => onCommentDeleted(comment.id)}
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
        {isButtonShown && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => onCommentWriteButtonCLick()}
          >
            Write a comment
          </button>
        )}
      </div>

      {isWritingComment && (
        <NewCommentForm
          isAddingComment={isAddingComment}
          onCommentAdded={onCommentAdded}
        />
      )}
    </div>
  );
};
