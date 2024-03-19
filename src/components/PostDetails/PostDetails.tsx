import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { usePosts } from '../../context/PostsContext';
import { useComments } from '../../context/CommentsContext';
import { CommentsItem } from '../CommentsItem';

export const PostDetails: React.FC = () => {
  const { openedPost } = usePosts();
  const {
    comments,
    handleFetchComments,
    commentsError,
    isCommentsLoading,
    handleToggleWriteComment,
    isWritingComment,
  } = useComments();

  useEffect(() => {
    if (openedPost) {
      handleFetchComments(openedPost.id);
    }
  }, [openedPost]);

  return (
    <>
      {openedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="content" data-cy="PostDetails">
            <div className="block">
              <h2 data-cy="PostTitle">
                #{openedPost.id}: {openedPost.title}
              </h2>

              <p data-cy="PostBody">{openedPost.body}</p>
            </div>

            <div className="block">
              {isCommentsLoading ? (
                <Loader />
              ) : (
                <>
                  {commentsError ? (
                    <div
                      className="notification is-danger"
                      data-cy="CommentsError"
                    >
                      Something went wrong
                    </div>
                  ) : (
                    <>
                      {!comments.length ? (
                        <p className="title is-4" data-cy="NoCommentsMessage">
                          No comments yet
                        </p>
                      ) : (
                        <>
                          <p className="title is-4">Comments:</p>

                          {comments.map(comment => (
                            <CommentsItem comment={comment} key={comment.id} />
                          ))}
                        </>
                      )}

                      {!isWritingComment && (
                        <button
                          onClick={() => handleToggleWriteComment(true)}
                          data-cy="WriteCommentButton"
                          type="button"
                          className="button is-link"
                        >
                          Write a comment
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {isWritingComment && <NewCommentForm />}
          </div>
        </div>
      )}
    </>
  );
};
