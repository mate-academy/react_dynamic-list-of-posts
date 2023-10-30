import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | undefined,
  error: boolean,
  isLoadingPost: boolean,
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
  wrtCommentBtnClk: boolean,
  handleWrtCommentBtnClk: () => void;
  handleCommentDelete: (id: number) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  post,
  error,
  isLoadingPost,
  comments,
  wrtCommentBtnClk,
  handleWrtCommentBtnClk,
  handleCommentDelete,
  setComments,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.title}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingPost && (
            <Loader />
          )}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          <p className="title is-4">Comments:</p>

          {!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={comment.email} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => {
                      handleCommentDelete(comment.id);
                    }}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))
          )}
          {!wrtCommentBtnClk && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                handleWrtCommentBtnClk();
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {wrtCommentBtnClk && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id}
          />
        )}
      </div>
    </div>
  );
});
