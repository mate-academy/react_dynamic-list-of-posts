import React from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  selectedPost: Post,
  comments: Comment[],
  isLoadingComments: boolean,
  hasErrComments: boolean,
  removeComment: (commentID: number) => void,
  hasNewCommentForm: boolean,
  setHasNewCommentForm: (has: boolean) => void,
  isAddingComment: boolean,
  addNewComment: (data: CommentData) => void,
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  hasErrComments,
  removeComment,
  hasNewCommentForm,
  setHasNewCommentForm,
  isAddingComment,
  addNewComment,
}) => {
  const { id, title, body } = selectedPost;

  const MainSection = () => {
    if (isLoadingComments) {
      return (<Loader />);
    }

    if (hasErrComments) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (!comments.length) {
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
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
                onClick={() => removeComment(comment.id)}
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
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            { body }
          </p>
        </div>

        <div className="block">
          <MainSection />

          {!hasNewCommentForm && !hasErrComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasNewCommentForm(true)}
            >
              Write a comment
            </button>

          )}

        </div>

        {hasNewCommentForm && !hasErrComments && (
          <NewCommentForm
            isAddingComment={isAddingComment}
            addNewComment={addNewComment}
          />
        )}
      </div>
    </div>
  );
};
