import React from 'react';
import { User } from '../types/User';
import * as userService from '../api/methods';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type PostContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  userError: boolean;
  setUserError: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  postList: Post[];
  setPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
  postComments: Comment[];
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  openCommentForm: boolean;
  setOpenCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
  deleteComment: (id: number) => Promise<void>;
  userLoading: boolean;
  commentsLoading: boolean;
  commentsError: boolean;
  openDetails: boolean;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectPostById: (id: number) => void;
};

export const PostContext = React.createContext<PostContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [postList, setPostList] = React.useState<Post[]>([]);
  const [post, setPost] = React.useState<Post | null>(null);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(false);
  const [userError, setUserError] = React.useState(false);
  const [commentsLoading, setCommentsLoading] = React.useState(false);
  const [commentsError, setCommentsError] = React.useState(false);
  const [postComments, setPostComments] = React.useState<Comment[]>([]);
  const [openCommentForm, setOpenCommentForm] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loaded = await userService.getUsers();

        setUsers(loaded);
      } catch {}
    };

    fetchUsers();
  }, []);

  React.useEffect(() => {
    setPostList([]);
    setPost(null);
    setOpenDetails(false);
  }, [user]);

  const selectPostById = React.useCallback(
    (id: number) => {
      const found = postList.find(p => p.id === id) || null;

      setPost(found);
    },
    [postList],
  );

  React.useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setCommentsLoading(true);
        if (post) {
          const loaded = await userService.getPostComments(post.id);

          setPostComments(loaded);
        } else {
          setPostComments([]);
        }
      } catch {
        setCommentsError(true);
        setTimeout(() => setCommentsError(false), 3000);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchPostComments();
  }, [post]);

  React.useEffect(() => {
    if (!user) {
      setPostList([]);

      return;
    }

    const fetchPosts = async () => {
      try {
        setUserLoading(true);
        const loaded = await userService.getPostListById(user.id);

        setPostList(loaded);
      } catch {
        setUserError(true);
        setTimeout(() => setUserError(false), 3000);
      } finally {
        setUserLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const deleteComment = async (id: number) => {
    try {
      await userService.deleteComment(id);
    } catch {}
  };

  return (
    <PostContext.Provider
      value={{
        users,
        setUsers,
        userError,
        setUserError,
        user,
        setUser,
        postList,
        setPostList,
        post,
        setPost,
        selectPostById,
        postComments,
        setPostComments,
        openCommentForm,
        setOpenCommentForm,
        deleteComment,
        userLoading,
        commentsLoading,
        commentsError,
        openDetails,
        setOpenDetails,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
