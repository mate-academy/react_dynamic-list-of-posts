import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPosts, getUsers, getComments } from '../api/api';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

interface PostContextType {
  posts: Post[];
  selectedPost: Post;
  selectedComments: Comment[];
  users: User[];
  person: User | null;
  postsLoading: boolean;
  commentsLoading: boolean;
  error: boolean;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setSelectedComments: React.Dispatch<React.SetStateAction<Comment[]>>
  setPerson: React.Dispatch<React.SetStateAction<User | null>>
  setPostsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [person, setPerson] = useState<User | null>(null);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(allUsers => setUsers(allUsers));
  }, []);

  useEffect(() => {
    setPostsLoading(true);
    getPosts()
      .then(allPosts => {
        setPosts(allPosts.filter(post => post.userId === person?.id));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, [person]);

  useEffect(() => {
    setCommentsLoading(true);
    getComments()
      .then(allComments => {
        setSelectedComments(
          allComments.filter(comment => comment.postId === selectedPost?.id),
        );
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCommentsLoading(false);
      });

    console.log(selectedComments)
  }, [selectedPost]);

  const memoizedValue = useMemo(() => ({
    posts,
    selectedPost,
    users,
    person,
    postsLoading,
    error,
    selectedComments,
    commentsLoading,
    setSelectedPost,
    setPerson,
  }), [posts,
    selectedPost,
    users,
    person,
    postsLoading,
    error,
    selectedComments,
    commentsLoading,
  ]);

  return (
    <PostContext.Provider value={memoizedValue}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }

  return context;
};
