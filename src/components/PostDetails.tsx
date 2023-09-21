import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  isCommentError: boolean;
  isCommentsLoading: boolean;
  comments: Comment[] | null;
  handleDelete: (commentId: number) => void;
  setCanWriteAComment: React.Dispatch<React.SetStateAction<boolean>>;
  canWriteAComment: boolean;
  handleAddComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentError,
  isCommentsLoading,
  comments,
  handleDelete,
  canWriteAComment,
  setCanWriteAComment,
  handleAddComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
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
                      onClick={() => handleDelete(comment.id)}
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

          {!canWriteAComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCanWriteAComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {canWriteAComment && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            handleAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
