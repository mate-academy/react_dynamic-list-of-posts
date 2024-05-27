import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';

type Props = {
  post: Post;
  comments: Comment[] | null;
  isLoadingComments: boolean;
  error: Error | null;
  isShowingForm: boolean;
  setIsShowingForm: (show: boolean) => void;
  isSubmittingForm: boolean;
  setIsSubmittingForm: (isSubmit: boolean) => void;
  handleCommentFormSubmit: (
    postId: Post['id'],
    authorName: string,
    authorEmail: string,
    commentBody: string,
  ) => void;
  handleDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  error,
  isShowingForm,
  setIsShowingForm,
  isSubmittingForm,
  setIsSubmittingForm,
  handleCommentFormSubmit,
  handleDeleteComment,
}) => {
  const isShowingNoCommentMessage =
    !isLoadingComments && !comments?.length && error !== Error.CommentsError;

  const isShowingCommentButton =
    !isShowingForm && !isLoadingComments && error !== Error.CommentsError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {error === Error.CommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isShowingNoCommentMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoadingComments && comments?.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoadingComments &&
            !!comments?.length &&
            comments.map(comment => (
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

          {isShowingCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsShowingForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShowingForm && (
          <NewCommentForm
            isSubmittingForm={isSubmittingForm}
            setIsSubmittingForm={setIsSubmittingForm}
            handleCommentFormSubmit={handleCommentFormSubmit}
            currentPostId={post.id}
          />
        )}
      </div>
    </div>
  );
};
