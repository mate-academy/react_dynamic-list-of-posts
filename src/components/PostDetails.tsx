import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  currentPost: Post | null;
  comments: Comment[] | null;
  isLoadingComments: boolean;
  commentsError: string;
  isCommentFormOpened: boolean;
  setIsCommentFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: ({ name, email, body }: CommentData) => Promise<void>;
  isLoadingComment: boolean;
  deleteComment: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  comments,
  isLoadingComments,
  commentsError,
  isCommentFormOpened,
  setIsCommentFormOpened,
  addComment,
  isLoadingComment,
  deleteComment,
}) => {
  const showNewCommentForm = () => {
    setIsCommentFormOpened(true);
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
          {isLoadingComments && <Loader />}

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

          {!isLoadingComments && comments && comments.length > 0 && (
            <p className="title is-4">Comments:</p>)}
          {comments
          && comments.length > 0 && !isLoadingComments && comments.map(
            ({
              id,
              name,
              email,
              body,
            }) => (
              <div key={id}>
                <article
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${email}`}
                      data-cy="CommentAuthor"
                    >
                      {name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              </div>
            ),
          )}

          {!isLoadingComments && !isCommentFormOpened && (
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

        {isCommentFormOpened && (
          <NewCommentForm
            addComment={addComment}
            postId={currentPost?.id}
            loadingComment={isLoadingComment}
          />
        )}
      </div>
    </div>
  );
};
