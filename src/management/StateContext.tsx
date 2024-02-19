import React, { useEffect, useReducer } from 'react';

import { State } from '../types/State';
import { Action, reducer } from './reducer';
import { getUsers } from '../api/users';
import { getPost } from '../api/posts';
import * as ServiceComments from '../api/comments';

const initialState: State = {
  users: [],
  posts: [],
  comments: [],
  newComment: null,
  commentForDelete: null,
  currentUser: null,
  currentPost: null,
  errorGetPosts: false,
  errorGetComments: false,
  isLoaderPosts: false,
  isLoaderComments: false,
  isLoaderAddComment: false,
  openCommentsButton: false,
  showFormWriteComment: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext<React.Dispatch<Action>>(() => { });

type Props = {
  children: React.ReactNode,
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentUser,
    currentPost,
    newComment,
    commentForDelete,
    comments,
  } = state;

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch({ type: 'getUsers', payload: usersFromServer });
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'errorGetPosts', payload: false });
      dispatch({ type: 'loadingPosts', payload: true });
      getPost(currentUser.id)
        .then(postsFromServer => {
          dispatch({ type: 'getPosts', payload: postsFromServer });
        })
        .catch(() => {
          dispatch({ type: 'errorGetPosts', payload: true });
        })
        .finally(() => {
          dispatch({ type: 'loadingPosts', payload: false });
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentPost) {
      dispatch({ type: 'errorGetComments', payload: false });
      dispatch({ type: 'loadingComments', payload: true });
      ServiceComments.getCommentsOfPost(currentPost.id)
        .then(commentsFromServer => {
          dispatch({ type: 'getComments', payload: commentsFromServer });
        })
        .catch(() => {
          dispatch({ type: 'errorGetComments', payload: true });
        })
        .finally(() => {
          dispatch({ type: 'loadingComments', payload: false });
        });
    }
  }, [currentPost]);

  useEffect(() => {
    if (newComment) {
      dispatch({ type: 'loadingAddComment', payload: true });
      dispatch({ type: 'errorGetComments', payload: false });

      ServiceComments.createComment(newComment)
        .then(comment => {
          dispatch({ type: 'addComment', payload: comment });
        })
        .catch(() => {
          dispatch({ type: 'errorGetComments', payload: true });
        })
        .finally(() => {
          dispatch({ type: 'loadingAddComment', payload: false });
        });
    }
  }, [newComment]);

  useEffect(() => {
    if (commentForDelete) {
      dispatch({ type: 'deleteComment', payload: commentForDelete.id });

      ServiceComments.deleteComment(commentForDelete.id)
        .then(() => {
          dispatch({ type: 'commentForDelete', payload: null });
        })
        .catch(() => {
          dispatch({ type: 'getComments', payload: comments });
        });
    }
  }, [commentForDelete, comments]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
