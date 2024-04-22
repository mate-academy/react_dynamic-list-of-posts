import React, { useContext, useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  addComment,
  deleteComment,
  getComments,
  getPost,
} from '../utils/functionFetch';
import { DispatchContext, StateContext } from '../context/ContextReducer';
import { Comment } from '../types/Comment';

const ERROR = 'error';
const DONE_FETCH = 'done';

export const PostDetails: React.FC = () => {
  const [loaderComments, setLoaderComments] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const { openButton } = useContext(StateContext);

  const {
    currentPostId,
    whriteComment,
    Post,
    signalAdd,
    fetchOfAddComent,
    newComment,
    fetchOfDeleteComent,
    signaDelete,
    deleteId,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const reset = () => {
    dispatch({ type: 'setName', name: '' });
    dispatch({ type: 'setEmail', email: '' });
    dispatch({ type: 'setBody', body: '' });
  };

  useEffect(() => {
    if (fetchOfDeleteComent) {
      deleteComment(deleteId)
        .then(() => {
          getComments()
            .then(fetchComments => {
              setComments(
                fetchComments.filter(
                  comment => comment.postId === currentPostId,
                ),
              );

              reset();
            })
            .catch(() => setError(ERROR))
            .finally(() => {
              if (loaderComments !== ERROR) {
                setLoaderComments(DONE_FETCH);
                dispatch({ type: 'unsetFetchOfDeleteComent' });
              }
            });
        })
        .catch(() => setError(ERROR));
    } else if (fetchOfAddComent) {
      addComment(newComment)
        .then(() => {
          getComments()
            .then(fetchComments => {
              setComments(
                fetchComments.filter(
                  comment => comment.postId === currentPostId,
                ),
              );

              reset();
            })
            .catch(() => setError(ERROR))
            .finally(() => {
              if (loaderComments !== ERROR) {
                setLoaderComments(DONE_FETCH);
                dispatch({ type: 'unsetFetchOfAddComent' });
              }
            });
        })
        .catch(() => setError(ERROR));
    } else {
      getPost().then(posts => {
        const filterPosts = posts.find(post => post.id === currentPostId);

        if (filterPosts) {
          dispatch({ type: 'setPostByCurrentId', payload: filterPosts });
        }
      });

      dispatch({ type: 'unsetWhriteComment' });
      setLoaderComments('');

      getComments()
        .then(fetchComments => {
          setComments(
            fetchComments.filter(comment => comment.postId === currentPostId),
          );

          return fetchComments;
        })
        .catch(() => {
          return setError(ERROR);
        })
        .finally(() => {
          if (loaderComments !== ERROR) {
            setLoaderComments(DONE_FETCH);
            dispatch({ type: 'unsetFetchOfAddComent' });
          }
        });
    }
  }, [currentPostId, openButton, signalAdd, signaDelete]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={currentPostId}
        classNames="post-details"
        timeout={300}
      >
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              #{Post?.id}: {Post?.title}
            </h2>

            <p data-cy="PostBody">{Post?.body}</p>
          </div>

          {error === ERROR && loaderComments === DONE_FETCH && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {loaderComments !== DONE_FETCH && <Loader />}

          {loaderComments === DONE_FETCH && error !== ERROR && (
            <div className="block">
              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {comments.map(c => (
                <article
                  key={c.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                      {c.name}
                    </a>
                    <button
                      onClick={() =>
                        dispatch({ type: 'deleteComment', currentId: c.id })
                      }
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {c.body}
                  </div>
                </article>
              ))}

              {!whriteComment && (
                <button
                  onClick={() => dispatch({ type: 'setWhriteComment' })}
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                >
                  Write a comment
                </button>
              )}
            </div>
          )}

          {whriteComment && <NewCommentForm />}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
