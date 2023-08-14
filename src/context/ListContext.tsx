import {
  FC, createContext, useState, useEffect, ReactNode, useMemo,
} from 'react';
import {
  User, Post, Comment, CommentData,
} from '../types';
import { getUsers } from '../api/users';
import { getPosts } from '../api/posts';
import { deleteComment, getComments, postComment } from '../api/comments';

type Props = {
  children: ReactNode;
};

interface IGlobalContext {
  error: boolean;
  resetError: () => void;
}

interface IPostsContext {
  posts: Post[];
  isPostsLoading: boolean;
  selectedPost: Post | null,
  onSelectPost: (post: Post) => void;
}

interface IUsersContext {
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  onSelectUser: (user: User) => void;
}

interface ICommentsContext {
  comments: Comment[];
  isCommentsLoading: boolean;
  commentIsProcessing: boolean;
  onAddNewComment: (comment: CommentData) => Promise<boolean>;
  onDeleteComment: (commentId: number) => void;
}

export const GlobalContext = createContext({} as IGlobalContext);
export const PostsContext = createContext({} as IPostsContext);
export const UsersContext = createContext({} as IUsersContext);
export const CommentsContext = createContext({} as ICommentsContext);

export const ListProvider: FC<Props> = ({ children }) => {
  const [error, setError] = useState(false);

  // #region User states
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  // #endregion

  // #region Posts states
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // #endregion

  // #region Comments states
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentIsProcessing, setCommentIsProcessing] = useState(false);
  // #endregion

  // #region load data

  /* load users */
  useEffect(() => {
    setError(false);
    setIsUsersLoading(true);

    const loadUsers = async () => {
      try {
        const usersList = await getUsers();

        setUsers(usersList);
      } catch {
        setError(true);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  /* load posts for selected user */
  useEffect(() => {
    setError(false);
    setSelectedPost(null);

    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(postList => setPosts(postList))
        .catch(() => setError(true))
        .finally(() => setIsPostsLoading(false));
    }
  }, [selectedUser]);

  /* load comments for selected post */
  useEffect(() => {
    setError(false);

    if (selectedPost) {
      getComments(selectedPost.id)
        .then(commentsList => setComments(commentsList))
        .catch(() => setError(true))
        .finally(() => setIsCommentsLoading(false));
    }
  }, [selectedPost]);
  // #endregion

  const onSelectUser = (user: User) => {
    if (selectedUser === user) {
      return;
    }

    setSelectedUser(user);
    setPosts([]);
    setIsPostsLoading(true);
  };

  const onSelectPost = (post: Post) => {
    setComments([]);

    if (post.id === selectedPost?.id) {
      setSelectedPost(null);

      return;
    }

    setIsCommentsLoading(true);
    setSelectedPost(post);
  };

  const onAddNewComment = (comment: CommentData) => {
    setError(false);

    setCommentIsProcessing(true);

    return postComment((selectedPost?.id as number), comment)
      .then(newComment => {
        setComments(prevComments => [...prevComments, newComment]);

        return true;
      })
      .catch(() => {
        setError(true);

        return false;
      })
      .finally(() => setCommentIsProcessing(false));
  };

  const onDeleteComment = (commentId: number) => {
    setError(false);

    setComments(prevComments => (
      prevComments.filter(comment => comment.id !== commentId)
    ));

    deleteComment(commentId)
      .catch(() => {
        setError(true);
        setComments(comments);
      });
  };

  const globalValue: IGlobalContext = useMemo(() => ({
    error,
    resetError: () => setError(false),
  }), [error]);

  const postsValue: IPostsContext = useMemo(() => ({
    posts,
    selectedPost,
    isPostsLoading,
    onSelectPost,
  }), [posts, selectedPost, isPostsLoading]);

  const usersValue: IUsersContext = useMemo(() => ({
    users,
    selectedUser,
    isUsersLoading,
    onSelectUser,
  }), [users, selectedUser, isUsersLoading]);

  const commentsValue: ICommentsContext = useMemo(() => ({
    comments,
    isCommentsLoading,
    commentIsProcessing,
    onAddNewComment,
    onDeleteComment,
  }), [comments, isCommentsLoading, commentIsProcessing]);

  return (
    <GlobalContext.Provider value={globalValue}>
      <UsersContext.Provider value={usersValue}>
        <PostsContext.Provider value={postsValue}>
          <CommentsContext.Provider value={commentsValue}>
            {children}
          </CommentsContext.Provider>
        </PostsContext.Provider>
      </UsersContext.Provider>
    </GlobalContext.Provider>
  );
};
