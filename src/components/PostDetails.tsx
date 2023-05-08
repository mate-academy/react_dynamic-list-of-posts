import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CurrentPost } from '../types/CurrentPost';
import { Comment } from '../types/Comment';
import { ErrorType } from '../utils/ErrorType';

interface Props {
  comments: Comment[] | null;
  setComments: (comments: Comment[]) => void;
  error: ErrorType;
  isWriteACommentClicked: boolean;
  currentPost?: CurrentPost;
  handleOnWriteACommentClick: () => void;
  handleCommentDelete: (id: number) => void;
  post: (
    url: string,
    data: any,
  ) => Promise<any>;
}

export const PostDetails: React.FC<Props> = ({
  comments,
  setComments,
  currentPost,
  error,
  isWriteACommentClicked,
  handleOnWriteACommentClick,
  handleCommentDelete,
  post,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {currentPost?.title}
          </h2>

          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          <p className="title is-4">Comments:</p>

          {comments && (
            comments.length ? (
              <>
                {comments.map(({
                  id, name, email, body,
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
                        onClick={() => handleCommentDelete(id)}
                      >
                        delete button
                      </button>
                    </div>
                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}
          {!comments && error === ErrorType.INITIAL && <Loader />}
          {error !== ErrorType.INITIAL && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!isWriteACommentClicked && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOnWriteACommentClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteACommentClicked && (
          <NewCommentForm
            post={post}
            postId={currentPost?.id}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
