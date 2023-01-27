import {
  FC,
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import * as postsService from '../api/posts';
import { Post } from '../types/Post';
import { UsersContext } from './UsersContext';

type Currently = 'noUser' | 'loading' | 'noPosts' | 'serverError' | 'active';

type ContextProps = {
  currently: Currently,
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
};

export const PostsContext = createContext<ContextProps>({
  currently: 'noUser',
  post: null,
  setPost: () => {},
  posts: [],
  setPosts: () => {},
});

type Props = {
  children: ReactNode;
};

export const PostsProvider: FC<Props> = ({ children }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currently, setCurrently] = useState('noUser');
  const { user } = useContext(UsersContext);

  useEffect(() => {
    setCurrently('loading');
    if (user) {
      postsService.getAllByUser(user.id)
        .then(result => {
          setPosts(result);
          setCurrently(result.length ? 'active' : 'noPosts');
        })
        .catch(() => {
          setCurrently('serverError');
        });
    } else {
      setCurrently('noUser');
    }
  }, [user]);

  return (
    <PostsContext.Provider value={{
      currently: currently as Currently,
      post,
      setPost,
      posts,
      setPosts,
    }}
    >
      {children}
    </PostsContext.Provider>
  );
};
