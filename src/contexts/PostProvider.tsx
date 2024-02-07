import React, { useMemo, useReducer } from 'react';
import { Post } from '../types/Post';

interface Props {
  children: React.ReactNode,
}

interface State {
  selectedPost: Post | null,
  errorMessage: string,
  isLoading: boolean,
}

type Action = {
  type: 'SetSelectedPost'
  post: Post | null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetSelectedPost': {
      return {
        ...state,
        selectedPost: action.post,
      };
    }

    default:
      return state;
  }
}

export const PostUpdateContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedPost: (_post: Post | null) => {},
});

export const PostsContext = React.createContext({
  selectedPost: null as Post | null,
  errorMessage: '',
  isLoading: false,
});

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedPost: null,
    errorMessage: '',
    isLoading: false,
  });

  function setSelectedPost(post: Post | null) {
    dispatch({
      type: 'SetSelectedPost',
      post,
    });
  }

  const postUpdateContextValue = useMemo(() => ({
    setSelectedPost,
  }), []);

  const postContextValue = useMemo(() => ({
    selectedPost: state.selectedPost,
    errorMessage: state.errorMessage,
    isLoading: state.isLoading,
  }), [state]);

  return (
    <PostUpdateContext.Provider value={postUpdateContextValue}>
      <PostsContext.Provider value={postContextValue}>
        {children}
      </PostsContext.Provider>
    </PostUpdateContext.Provider>
  );
};
