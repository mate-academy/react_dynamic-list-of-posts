import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  currentPost: Post | null;
  comments: Comment[] | null;
  loadingComments: boolean;
  commentsError: string;
  newCommentForm: boolean;
  setNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: ({ name, email, body }: CommentData) => Promise<void>;
  loadingComment: boolean;
  deleteComment: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  comments,
  loadingComments,
  commentsError,
  newCommentForm,
  setNewCommentForm,
  addComment,
  loadingComment,
  deleteComment,
}) => {
  const showNewCommentForm = () => {
    setNewCommentForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {currentPost && (`#${currentPost.id}: ${currentPost.title}`)}
          </h2>

          <p data-cy="PostBody">
            {currentPost && currentPost.body}
          </p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && comments && comments.length > 0 && (
            <p className="title is-4">Comments:</p>)}
          {comments && comments.length > 0 && !loadingComments && comments.map(
            comment => (
              <div key={comment.id}>
                <article
                  className="message is-small"
                  data-cy="Comment"
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
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              </div>
            ),
          )}

          {!loadingComments && !newCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={showNewCommentForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {newCommentForm && (
          <NewCommentForm
            addComment={addComment}
            postId={currentPost?.id}
            loadingComment={loadingComment}
          />
        )}
      </div>
    </div>
  );
};
