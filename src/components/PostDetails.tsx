import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  comments: Comment[],
  selectedPost: Post | null,
  isLoadingComments: boolean,
  openPostId: number,
  addComment: (el: Comment) => void,
  isShowingForm: boolean,
  changeIsShowingForm: (el: boolean) => void,
  onDelete: (id: number) => void,
  error: boolean,
  changeErrorState: (el: boolean) => void
}

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  isLoadingComments,
  openPostId,
  addComment,
  isShowingForm,
  changeIsShowingForm,
  onDelete,
  error,
  changeErrorState,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">

        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {!error && isLoadingComments && (
            <Loader />)}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!error && !comments.length && comments && !isLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!error
            && Boolean(comments.length)
            && comments
            && !isLoadingComments
            && (
              <p className="title is-4">Comments:</p>)}

          {!error && Boolean(comments.length)
            && !isLoadingComments
            && comments.map(comment => (
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
                    onClick={() => onDelete(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!error && !isLoadingComments && (isShowingForm
            ? (
              <NewCommentForm
                postId={openPostId}
                addNewComment={addComment}
                changeErrorState={changeErrorState}
              />
            )
            : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => changeIsShowingForm(true)}
              >
                Write a comment
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
