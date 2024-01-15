import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as data from '../../api/data';
import { Post } from '../../types/Post';
import { MainContentType } from '../../types/MainContentType';
import { PostCommentsType } from '../../types/PostCommentsType';
import { UsersContext } from '../Users/UserContext';

export interface PostsContextType {
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: (selectedPost: Post | null) => void,
  details: PostCommentsType,
  setDetails: (context: PostCommentsType) => void,
  formIsVisible: boolean,
  setFormIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PostsContext = React.createContext<PostsContextType>({
  posts: [],
  setPosts: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
  details: PostCommentsType.None,
  setDetails: () => { },
  formIsVisible: false,
  setFormIsVisible: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [details, setDetails]
    = useState<PostCommentsType>(PostCommentsType.None);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const { selectedUser, setMainContent } = useContext(UsersContext);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setMainContent(MainContentType.Loader);

    data.getPosts(selectedUser.id)
      .then(currentPosts => {
        if (currentPosts.length === 0) {
          setMainContent(MainContentType.NoPostsYet);
        } else {
          setPosts(currentPosts);
          setMainContent(MainContentType.PostsList);
        }
      })
      .catch(() => setMainContent(MainContentType.PostsLoadingError));
  }, [selectedUser, setMainContent]);

  const value = useMemo(() => ({
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    details,
    setDetails,
    formIsVisible,
    setFormIsVisible,
  }), [posts, selectedPost, details, formIsVisible]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
