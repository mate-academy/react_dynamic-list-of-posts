import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppContext } from './HooksContext';
import {
  CurError,
  CurLoading,
  deleteComment,
  getCommentsByPostId,
} from '../utils/servises';
import { CommentData } from '../types/Comment';
import classNames from 'classnames';

export const PostDetails: React.FC = () => {
  const {
    activePost,
    setLoading,
    comments,
    setComments,
    setErrorMessage,
    loading,
    errorMessage,
    newComment,
    setNewComment,
  } = useAppContext();

  useEffect(() => {
    const getCommentsFromServer = async () => {
      setLoading(CurLoading.Comms);
      try {
        const commentsFromServer = await getCommentsByPostId(activePost!.id);

        setComments(commentsFromServer);
      } catch (error) {
        setErrorMessage(CurError.LoadComs);
      } finally {
        setLoading(CurLoading.Empty);
      }
    };

    if (activePost) {
      getCommentsFromServer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePost]);

  const emptyComment: CommentData = {
    name: '',
    email: '',
    body: '',
  };

  return (
    <>
      {activePost && (
        <div className="content" data-cy="PostDetails">
          <div className="content" data-cy="PostDetails">
            <div className="block">
              <h2 data-cy="PostTitle">{`#${activePost.id}: ${activePost?.title}`}</h2>

              <p data-cy="PostBody">{activePost?.body}</p>
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {(errorMessage === CurError.LoadComs ||
                    errorMessage === CurError.AddComs) && (
                    <div
                      className="notification is-danger"
                      data-cy="CommentsError"
                    >
                      Something went wrong
                    </div>
                  )}

                  {comments.length === 0 && errorMessage === CurError.Empty && (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )}

                  {comments.length > 0 && errorMessage !== CurError.AddComs && (
                    <>
                      <p className="title is-4">Comments:</p>

                      {comments.map(curComment => (
                        <article
                          className="message is-small"
                          data-cy="Comment"
                          key={curComment.id}
                        >
                          <div className="message-header">
                            <a
                              href={`mailto:${curComment.email}`}
                              data-cy="CommentAuthor"
                            >
                              {curComment.name}
                            </a>
                            <button
                              data-cy="CommentDelete"
                              type="button"
                              className="delete is-small"
                              aria-label="delete"
                              onClick={() =>
                                deleteComment(
                                  curComment.id,
                                  setComments,
                                  setLoading,
                                  setErrorMessage,
                                )
                              }
                            >
                              delete button
                            </button>
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {curComment.body}
                          </div>
                        </article>
                      ))}
                    </>
                  )}

                  {newComment === null && errorMessage === CurError.Empty && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className={classNames('button is-link')}
                      onClick={() => setNewComment(emptyComment)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </div>

            {newComment && errorMessage !== CurError.AddComs && (
              <NewCommentForm />
            )}
          </div>
        </div>
      )}
    </>
  );
};
