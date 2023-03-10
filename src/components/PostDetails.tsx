import React, { useContext, useEffect, useMemo } from 'react';
import { deleteComment, getCommentsPost } from '../api';
import { GlobalContext } from '../reducer';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const getComments = (id: number) => {
    getCommentsPost(id)
      .then((request: Comment[] | Error) => {
        if ('error' in request) {
          dispatch({
            type: 'error',
            error: { ...request, type: 'comments' },
          });
          dispatch({
            type: 'loadData',
            objectLoad: { type: 'comments', active: false },
          });
        } else {
          dispatch({ type: 'commentsPost', comments: request as Comment[] });
          dispatch({
            type: 'loadData',
            objectLoad: { type: 'comments', active: false },
          });
        }
      });
  };

  useEffect(() => {
    if (state.selectedPost) {
      dispatch({
        type: 'loadData',
        objectLoad: { type: 'comments', active: true },
      });
      getComments(state.selectedPost.id);
    }
  }, [state.selectedPost]);

  const deleteCommentHandler = (id:number) => {
    deleteComment(id).then(() => {
      if (state.selectedPost) {
        dispatch({
          type: 'commentsPost',
          comments: state.commentsPost.filter((el: Comment) => el.id !== id),
        });
      }
    });
  };

  const renderCommentForm = useMemo(() => {
    return !state.activeForm ? (
      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={() => dispatch({ type: 'activeForm', active: true })}
      >
        Write a comment
      </button>
    ) : <NewCommentForm getComments={getComments} />;
  }, [state.activeForm]);

  const renderListComments = useMemo(() => {
    return (
      <>
        <p className="title is-4">Comments:</p>
        {state.commentsPost.length < 1 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {state.commentsPost.map((comment: Comment) => {
          return (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a
                  href={`mailto:${comment.email}`}
                  data-cy="CommentAuthor"
                >
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => deleteCommentHandler(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          );
        })}
        {state.error?.type === 'comments' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
      </>
    );
  }, [state.error, state.commentsPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${state.selectedPost?.id}: ${state.selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {state.selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {state.load.type === 'comments' && state.load.active
          ? <Loader />
          : renderListComments}
      </div>

      {renderCommentForm}
    </div>
  );
};
