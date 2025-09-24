import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  comments?: Comment[];
  loadComments: () => void;
  isCommentsLoading?: boolean;
  commentsLoadingError?: boolean;
  deleteComment: (commentId: number) => void;
  addComment: (newComment: Omit<Comment, 'id'>) => Promise<Comment>;
  addCommentError?: boolean;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  loadComments,
  isCommentsLoading,
  commentsLoadingError,
  deleteComment,
  addComment,
  addCommentError,
}) => {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    setIsCommentFormVisible(false);
  }, [post]);

  const handleWriteCommentClick = () => {
    setIsCommentFormVisible(!isCommentFormVisible);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}` || ''}</h2>

        <p data-cy="PostBody">{post?.body || ''}</p>
      </div>

      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div className="block">
          {commentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              <div>Something went wrong</div>
              <button
                type="button"
                className="button is-small is-danger is-outlined"
                onClick={loadComments}
              >
                Try again
              </button>
            </div>
          )}

          {!commentsLoadingError &&
            (comments && comments.length > 0 ? (
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
                        onClick={() => deleteComment(comment.id)}
                      ></button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ))}

          {!commentsLoadingError && !isCommentFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentClick}
            >
              Write a comment
            </button>
          )}
        </div>
      )}

      {isCommentFormVisible && (
        <NewCommentForm
          addComment={addComment}
          post={post}
          hasError={addCommentError}
        />
      )}
    </div>
  );
};
