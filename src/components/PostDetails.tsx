import React from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment as CommentType } from '../types/Comment';

interface PostDetailsProps {
  selectedPost: Post;
  areCommentsLoading: boolean;
  comments: CommentType[] | [];
  hasError: boolean;
  showAddComment: boolean,
  onShowAddComment: () => void;
  onChangeCommentAuthorName:
  (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCommentAuthorEmail:
  (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCommentContent:
  (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentAuthorName: string;
  commentAuthorEmail: string;
  commentContent: string;
  onClearCommentForm: () => void;
  onCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  hasFormError: boolean;
  isAddingComment: boolean;
  onRemoveComment: (id: number) => void;
  hasCommentError: boolean;
}

export const PostDetails: React.FC<PostDetailsProps> = React.memo(({
  selectedPost,
  areCommentsLoading,
  comments,
  showAddComment,
  onShowAddComment,
  commentAuthorName,
  commentAuthorEmail,
  commentContent: commentConent,
  onChangeCommentAuthorName,
  onChangeCommentAuthorEmail,
  onChangeCommentContent,
  onClearCommentForm,
  onCommentSubmit,
  hasFormError,
  isAddingComment,
  onRemoveComment,
  hasCommentError,
}) => {
  const { id, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {areCommentsLoading && <Loader />}

          {hasCommentError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )
            : (
              <>
                {!areCommentsLoading && !comments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!areCommentsLoading && comments.length > 1
                  && <p className="title is-4">Comments:</p>}
                {comments.length > 0 && comments.map(comment => {
                  const {
                    id: commentId,
                    name: commentName,
                    email: commentEmail,
                    body: commentBody,
                  } = comment;

                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={commentId}
                    >
                      <div className="message-header">
                        <a href={`mailto:${commentEmail}`} data-cy="CommentAuthor">
                          {commentName}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => onRemoveComment(commentId)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {commentBody}
                      </div>
                    </article>

                  );
                })}
              </>
            )}
          {!areCommentsLoading && !showAddComment && !hasCommentError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={onShowAddComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {showAddComment
        && (
          <NewCommentForm
            onChangeCommentAuthorName={onChangeCommentAuthorName}
            onChangeCommentAuthorEmail={onChangeCommentAuthorEmail}
            onChangeCommentContent={onChangeCommentContent}
            commentAuthorName={commentAuthorName}
            commentAuthorEmail={commentAuthorEmail}
            commentContent={commentConent}
            onClearCommentForm={onClearCommentForm}
            onCommentSubmit={onCommentSubmit}
            hasFormError={hasFormError}
            isAddingComment={isAddingComment}
          />
        )}
      </div>
    </div>
  );
});
