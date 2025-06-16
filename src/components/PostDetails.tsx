import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useComments } from '../hooks/useComments';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    comments,
    isCommentsLoading,
    isCommentsError,
    isEmpty,
    isComments,
    isButtonShown,
    isNewCommentFormVisible,
    setIsNewCommentFormVisible,
    addComment,
    deleteComment,
  } = useComments(post);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isEmpty && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {isComments && (
            <div className="block">
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
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
                      onClick={() => deleteComment?.(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {isButtonShown && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() =>
              setIsNewCommentFormVisible?.(!isNewCommentFormVisible)
            }
          >
            Write a comment
          </button>
        )}
      </div>

      {isNewCommentFormVisible && comments && (
        <NewCommentForm
          onCommentAdd={addComment}
          postId={post?.id}
          isCommentsLoading={isCommentsLoading}
        />
      )}
    </div>
  );
};
