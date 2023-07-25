import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post;
  comments: Comment[] | null;
  isCommentError: boolean;
  canWriteComment: boolean;
  setCanWriteComment: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNewComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
  handleDeleteComment: (commentId: number) => void;
  isCommentsLoading: boolean;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isCommentError,
  canWriteComment,
  setCanWriteComment,
  handleAddNewComment,
  handleDeleteComment,
  isCommentsLoading,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && !isCommentError && <Loader />}

          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && !isCommentsLoading && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment) => (
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
                      onClick={() => handleDeleteComment(comment.id)}
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

          {!canWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCanWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {canWriteComment && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            handleAddNewComment={handleAddNewComment}
          />
        )}
      </div>
    </div>
  );
};
