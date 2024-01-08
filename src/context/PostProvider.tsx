import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  getPosts,
  getUsers,
  getComments,
  addComment,
  deleteComment,
} from '../api/api';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

interface PostContextType {
  posts: Post[];
  selectedPost: Post | null;
  selectedComments: Comment[];
  users: User[];
  person: User | null;
  postsLoading: boolean;
  commentsLoading: boolean;
  addPostLoading: boolean;
  error: boolean;
  isEdit: boolean;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  setSelectedComments: React.Dispatch<React.SetStateAction<Comment[]>>
  setPerson: React.Dispatch<React.SetStateAction<User | null>>
  setPostsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setAddPostLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  handleDeleteComment: (commentId: number) => void;
  handleAddComment: (name: string, mail: string, comment: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedComments, setSelectedComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [person, setPerson] = useState<User | null>(null);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [addPostLoading, setAddPostLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const firstRender = useRef(true);

  useEffect(() => {
    getUsers()
      .then(allUsers => setUsers(allUsers));
  }, []);

  useMemo(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setPosts([]);
    setPostsLoading(true);
    setSelectedPost(null);
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

  const handleDeleteComment = (commentId: number) => {
    const updatedSelectedComments
    = selectedComments.filter(comment => comment.id !== commentId);

    deleteComment(commentId);

    setSelectedComments(updatedSelectedComments);
  };

  const handleAddComment = (name: string, email: string, body: string) => {
    setAddPostLoading(true);
    const data = {
      id: 0,
      postId: selectedPost?.id !== undefined ? selectedPost.id : 0,
      name,
      email,
      body,
    };

    addComment(data)
      .then(() => {
        setSelectedComments([...selectedComments, data]);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      })
      .finally(() => {
        setAddPostLoading(false);
      });
  };

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
    addPostLoading,
    isEdit,
    setSelectedPost,
    setSelectedComments,
    setPerson,
    setPostsLoading,
    setCommentsLoading,
    setAddPostLoading,
    setError,
    setIsEdit,
    handleDeleteComment,
    handleAddComment,
  }), [
    posts,
    selectedPost,
    users,
    person,
    postsLoading,
    error,
    selectedComments,
    commentsLoading,
    addPostLoading,
    isEdit,
    setSelectedPost,
    setSelectedComments,
    setPerson,
    setPostsLoading,
    setCommentsLoading,
    setAddPostLoading,
    setError,
    setIsEdit,
    handleDeleteComment,
    handleAddComment,
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
