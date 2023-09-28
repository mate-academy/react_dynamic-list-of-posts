import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getComments, getPosts, getUsers } from './api/posts';
import { Post } from './types/Post';
import { PostsContextType } from './types/PostsContextType';
import { User } from './types/User';

type Props = {
  children: React.ReactNode;
};

export const PostsContext = React.createContext<PostsContextType>({
  selectedUser: null,
  setSelectedUser: () => { },
  users: [],
  hasError: false,
  setHasError: () => {},
  removeError: () => {},
  posts: [],
  isLoading: false,
  setIsLoading: () => {},
  getAllUserPosts: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
  getPostDetails: () => {},
  comments: [],
  setComments: () => {},
  openForm: false,
  setOpenForm: () => {},
});

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const removeError = (time = 3000) => {
    setTimeout(() => {
      setHasError(false);
    }, time);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setHasError(true);
        removeError();
      });
  }, []);

  const getAllUserPosts = (userId: number) => {
    setIsLoading(true);

    getPosts(userId)
      .then(setPosts)
      .catch(() => {
        setHasError(true);
        removeError();
      })
      .finally(() => setIsLoading(false));
  };

  const getPostDetails = (postId: number) => {
    setIsLoading(true);

    getComments(postId)
      .then(setComments)
      .catch(() => {
        setHasError(true);
        removeError();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PostsContext.Provider value={{
      selectedUser,
      setSelectedUser,
      users,
      hasError,
      setHasError,
      removeError,
      posts,
      isLoading,
      setIsLoading,
      getAllUserPosts,
      selectedPost,
      setSelectedPost,
      getPostDetails,
      comments,
      setComments,
      openForm,
      setOpenForm,
    }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
