import { createContext, useContext, useReducer } from 'react';
import { Post } from '../types';
import { getPosts } from '../utils/getPosts';

type State = {
  posts: Post[];
  openedPost: Post | null;
  isPostsLoading: boolean;
  postsError: string;
  handleFetchComments: (userId: number) => void;
  hadndleOpenPost: (post: Post) => void;
};

const initialState: State = {
  posts: [],
  isPostsLoading: false,
  postsError: '',
  openedPost: null,
  handleFetchComments: () => {},
  hadndleOpenPost: () => {},
};

const PostsContext = createContext(initialState);

type Action =
  | { type: 'posts/loaded'; payload: Post[] }
  | { type: 'rejected'; payload: string }
  | { type: 'posts/openPost'; payload: Post }
  | { type: 'loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isPostsLoading: action.payload };

    case 'posts/loaded':
      return { ...state, isPostsLoading: false, posts: action.payload };

    case 'posts/openPost':
      return {
        ...state,
        openedPost: state.openedPost === action.payload ? null : action.payload,
      };

    case 'rejected':
      return { ...state, isPostsLoading: false, todosError: action.payload };
    default:
      return state;
  }
}

const PostsProvider: React.FC<Props> = ({ children }) => {
  const [{ posts, isPostsLoading, postsError, openedPost }, dispatch] =
    useReducer(reducer, initialState);

  const handleFetchComments = async (userId: number) => {
    dispatch({ type: 'loading', payload: true });
    try {
      const fetchedPosts = await getPosts(userId);

      dispatch({ type: 'posts/loaded', payload: fetchedPosts });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'Something went wrong',
      });
    }
  };

  const hadndleOpenPost = (post: Post) => {
    dispatch({ type: 'posts/openPost', payload: post });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        isPostsLoading,
        postsError,
        openedPost,
        handleFetchComments,
        hadndleOpenPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => {
  const context = useContext(PostsContext);

  if (context === undefined) {
    throw new Error('PostsContext was used outside of the PostProvider');
  }

  return context;
};

export { usePosts, PostsProvider };
