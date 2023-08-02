import React, {
  Dispatch,
  useState,
  useEffect,
} from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post, Comment } from './types';
import { getComments } from './api/comments';

type Context = {
  allUsers: User[],
  selectedUser: User | null,
  setSelectedUser: Dispatch<React.SetStateAction<User | null>>,
  arePostsLoading: boolean,
  posts: Post[],
  isPostsLoadingError: boolean,
  selectedPost: Post | null,
  setSelectedPost: Dispatch<React.SetStateAction<Post | null>>,
  comments: Comment[],
  setComments: Dispatch<React.SetStateAction<Comment[]>>
  areCommentsLoading: boolean,
  isCommentsLoadingError: boolean,
  isWritingComment: boolean,
  setIsWritingComment: Dispatch<React.SetStateAction<boolean>>,
};

export const PostsContext = React.createContext({} as Context);

type Props = {
  children: React.ReactNode,
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [isPostsLoadingError, setIsPostsLoadingError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [isCommentsLoadingError, setIsCommentsLoadingError] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setAllUsers);
  }, []);

  useEffect(() => {
    if (selectedUser?.id) {
      setPosts([]);
      setArePostsLoading(true);
      setIsPostsLoadingError(false);

      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setIsPostsLoadingError(true);
        })
        .finally(() => {
          setArePostsLoading(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost?.id) {
      setIsWritingComment(false);
      setComments([]);
      setAreCommentsLoading(true);
      setIsCommentsLoadingError(false);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => {
          setIsCommentsLoadingError(true);
        })
        .finally(() => {
          setAreCommentsLoading(false);
        });
    }
  }, [selectedPost]);

  const value: Context = {
    allUsers,
    selectedUser,
    setSelectedUser,
    arePostsLoading,
    posts,
    isPostsLoadingError,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    areCommentsLoading,
    isCommentsLoadingError,
    isWritingComment,
    setIsWritingComment,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
