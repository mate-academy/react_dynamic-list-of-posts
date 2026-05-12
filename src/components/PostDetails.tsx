/* eslint-disable @typescript-eslint/indent */
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { useState } from 'react';
import { deletePostComments } from '../utils/api';

type Props = {
  selectedPost: Post | null;
  postComments: Comment[];
  isCommentsLoading: boolean;
  commentErrorMessage: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isWritingComment: boolean;
  setIsWritingComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  postComments,
  isCommentsLoading,
  commentErrorMessage,
  setComments,
  isWritingComment,
  setIsWritingComment,
}) => {
  const [tempComment, setTempComment] = useState<Comment | null>(null);

  function handleCommentDelete(commentId: number) {
    deletePostComments(commentId).catch(error => {
      throw error;
    });

    setComments(prev => prev.filter(comment => comment.id !== commentId));
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {commentErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading &&
            postComments.length === 0 &&
            !commentErrorMessage && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          <p className="title is-4">Comments:</p>

          {postComments.map(comment => (
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
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {tempComment && (
            <article
              className="message is-small"
              data-cy="Comment"
              key={tempComment.id}
            >
              <div className="message-header">
                <a href={`mailto:${tempComment.email}`} data-cy="CommentAuthor">
                  {tempComment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleCommentDelete(tempComment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {tempComment.body}
              </div>
            </article>
          )}

          {!isWritingComment && !isCommentsLoading && !commentErrorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(prev => !prev)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritingComment && (
          <NewCommentForm
            selectedPostId={selectedPost?.id ?? null}
            setComments={setComments}
            setTempComment={setTempComment}
          />
        )}
      </div>
    </div>
  );
};
