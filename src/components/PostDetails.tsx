import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { ErrorType } from '../types/Errors';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[];
  postsApi: Post[];
  selectedPostId: number | null;
  isLoading: boolean;
  errorMessage: string;
  onSubmitComment: (comment: CommentData) => Promise<void>;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  isLoading,
  errorMessage,
  postsApi,
  selectedPostId,
  onSubmitComment,
  onDeleteComment,
}) => {
  const [isOpenForm, setIsOpenForm] = React.useState(false);

  const activePost = postsApi.find(p => p.id === selectedPostId);
  const postComments = comments.filter(c => c.postId === selectedPostId);

  const handleOpenForm = (comment: CommentData) => {
    return onSubmitComment(comment);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {activePost && (
          <div className="block">
            <h2 data-cy="PostTitle">
              #{activePost.id}: {activePost.title}
            </h2>
            <p data-cy="PostBody">{activePost.body}</p>
          </div>
        )}
        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {ErrorType.DownloadError}
            </div>
          )}

          {!isLoading && postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {ErrorType.NoPosts}
            </p>
          )}

          {postComments.length > 0 && <p className="title is-4">Comments:</p>}
          {postComments.map(comment => (
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
                  onClick={() => onDeleteComment(comment.id)}
                  >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isOpenForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsOpenForm(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenForm && <NewCommentForm onSubmit={handleOpenForm} />}
      </div>
    </div>
  );
};
