import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type PostDetailsProps = {
  openedPost: Post | null;
  postComments: Comment[];
  isLoadingComment: boolean;
  isErrorComment: boolean;
  createComment: (comment: Omit<Comment, 'id'>) => void;
  isLoadingNewComment: boolean;
  removeComment: (commentId: number) => void;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  openedPost,
  postComments,
  isLoadingComment,
  isErrorComment,
  createComment,
  isLoadingNewComment,
  removeComment,
}) => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    setIsFormOpened(false);
  }, [openedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{openedPost?.id}: {openedPost?.title}
          </h2>

          <p data-cy="PostBody">{openedPost?.body}</p>
        </div>

        <div className="block">
          {isLoadingComment && <Loader />}

          {isErrorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

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
                      onClick={() => {
                        removeComment(comment.id);
                      }}
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
          )}

          {!isFormOpened && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsFormOpened(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpened && (
          <NewCommentForm
            createComment={createComment}
            isLoadingNewComment={isLoadingNewComment}
            openedPost={openedPost}
          />
        )}
      </div>
    </div>
  );
};
