import React, { createContext, useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { getUsers } from '../api/Users';
import { getPosts } from '../api/Posts';
import { deleteComment, getComments } from '../api/Comments';

type PostsValuesContextType = {
  posts: Post[];
  users: User[];
  selectedUser: User | null;
  postsIsLoading: boolean;
  postsError: boolean;
  isSidebarOpen: boolean;
  selectedPost: Post | null;
  postComments: Comment[];
  commentsIsLoading: boolean;
  commentsError: boolean;
  isCommentFormOpen: boolean;
};

type PostsSettersContextType = {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsCommentFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  handleDeleteComment: (commentId: number) => void;
};

export const PostsValueContext = createContext<PostsValuesContextType>({
  posts: [],
  users: [],
  selectedUser: null,
  postsIsLoading: false,
  postsError: false,
  isSidebarOpen: false,
  selectedPost: null,
  postComments: [],
  commentsIsLoading: false,
  commentsError: false,
  isCommentFormOpen: false,
});

export const PostsSettersContext = createContext<PostsSettersContextType>({
  setPosts: () => {},
  setSelectedUser: () => {},
  setIsSidebarOpen: () => {},
  setSelectedPost: () => {},
  handleDeleteComment: () => {},
  setIsCommentFormOpen: () => {},
  setPostComments: () => {},
});

type PostsProviderProps = {
  children: React.ReactNode;
};
export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postsIsLoading, setPostsIsLoading] = useState<boolean>(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [commentsIsLoading, setCommentsIsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  useEffect(() => {
    getUsers().then((response: User[]) => {
      setUsers(response);
    });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPostsIsLoading(true);
    setIsSidebarOpen(false);

    getPosts(selectedUser.id)
      .then((response: Post[]) => {
        setPosts(response);
      })
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => {
        setPostsIsLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsCommentFormOpen(false);
    setCommentsIsLoading(true);

    getComments(selectedPost.id)
      .then((response: Comment[]) => {
        setPostComments(response);
      })
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setCommentsIsLoading(false);
      });
  }, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setPostComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    });
  };

  return (
    <PostsValueContext.Provider
      value={{
        posts,
        users,
        selectedUser,
        postsIsLoading,
        postsError,
        isSidebarOpen,
        selectedPost,
        postComments,
        commentsIsLoading,
        commentsError,
        isCommentFormOpen,
      }}
    >
      <PostsSettersContext.Provider
        value={{
          setPosts,
          setSelectedUser,
          setIsSidebarOpen,
          setSelectedPost,
          handleDeleteComment,
          setIsCommentFormOpen,
          setPostComments,
        }}
      >
        {children}
      </PostsSettersContext.Provider>
    </PostsValueContext.Provider>
  );
};
