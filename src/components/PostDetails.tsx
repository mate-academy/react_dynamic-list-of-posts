import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { useState } from 'react';
import { deleteComment } from '../api/request';

type PostDetailsProps = {
  selectedPost: Post | undefined;
  comments: Comment[];
  isGetCommentsError: boolean;
  isLoadingComments: boolean;
  selectedPostId: number | null;
  onComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export function PostDetails({
  selectedPost,
  comments,
  isGetCommentsError,
  isLoadingComments,
  selectedPostId,
  onComments,
}: PostDetailsProps) {
  const [newCommentFormIsVisible, setNewCommentFormIsVisible] = useState(false);

  const hasCommentsLoadingError = isGetCommentsError && !isLoadingComments;
  const hasNoComments = comments.length === 0 && !isLoadingComments;
  const shouldShowWriteButton =
    !isGetCommentsError && !isLoadingComments && !newCommentFormIsVisible;

  function handleDeleteComment(commentId: number) {
    const currentComments = [...comments];

    onComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      onComments(currentComments);
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}
          {hasCommentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {hasNoComments && !isGetCommentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          <p className="title is-4">Comments:</p>
          {!isLoadingComments &&
            comments.map(comment => {
              return (
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
          {shouldShowWriteButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setNewCommentFormIsVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {newCommentFormIsVisible && (
          <NewCommentForm
            selectedPostId={selectedPostId}
            onComments={onComments}
          />
        )}
      </div>
    </div>
  );
}
