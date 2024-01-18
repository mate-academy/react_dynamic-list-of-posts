import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  comments: Comment[],
  selectedPost: Post,
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
  const isIdle = !error && !isLoadingComments;
  const hasComments = isIdle && Boolean(comments.length) && comments;
  const hasNoComments = isIdle && !comments.length && comments;

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
          {!error && isLoadingComments && (
            <Loader />)}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasComments && (
            <p className="title is-4">Comments:</p>
          )}

          {hasComments
            && comments.map(({
              id, email, name, body,
            }) => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={id}
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDelete(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}

          {isIdle
            && (isShowingForm
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
