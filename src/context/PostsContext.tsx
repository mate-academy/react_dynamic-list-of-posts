import { createContext, useContext, useReducer } from 'react';
import { Post } from '../types';
import { getPosts } from '../utils/getPosts';

type State = {
  posts: Post[];
  openedPost: Post | null;
  isPostsLoading: boolean;
  postsError: string;
  handleFetchComments: (userId: number) => void;
  handleOpenPost: (post: Post | null) => void;
};

const initialState: State = {
  posts: [],
  isPostsLoading: true,
  postsError: '',
  openedPost: null,
  handleFetchComments: () => {},
  handleOpenPost: () => {},
};

const PostsContext = createContext(initialState);

type Action =
  | { type: 'posts/loaded'; payload: Post[] }
  | { type: 'posts/rejected'; payload: string }
  | { type: 'posts/openPost'; payload: Post | null }
  | { type: 'posts/loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'posts/loading':
      return { ...state, isPostsLoading: action.payload };

    case 'posts/loaded':
      return { ...state, isPostsLoading: false, posts: action.payload };

    case 'posts/openPost':
      return {
        ...state,
        openedPost: state.openedPost === action.payload ? null : action.payload,
      };

    case 'posts/rejected':
      return { ...state, isPostsLoading: false, postsError: action.payload };
    default:
      return state;
  }
}

const PostsProvider: React.FC<Props> = ({ children }) => {
  // Can't fix it because of  Prettier
  /* eslint-disable */
  const [{ posts, isPostsLoading, postsError, openedPost }, dispatch] =
    useReducer(reducer, initialState);
  /* eslint-enable */
  const handleFetchComments = async (userId: number) => {
    dispatch({ type: 'posts/loading', payload: true });
    try {
      const fetchedPosts = await getPosts(userId);

      dispatch({ type: 'posts/loaded', payload: fetchedPosts });
    } catch {
      dispatch({
        type: 'posts/rejected',
        payload: 'Something went wrong',
      });
    } finally {
      dispatch({ type: 'posts/loading', payload: false });
    }
  };

  const handleOpenPost = (post: Post | null) => {
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
        handleOpenPost,
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
