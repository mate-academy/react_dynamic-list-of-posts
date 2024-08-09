import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SharedContextValue } from './types/ContextValues';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { Comment, CommentData } from './types/Comment';
import { createComment, deleteComment, getComments } from './api/comments';

export const SharedContext = createContext<SharedContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SharedProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSumbitting, setIsSumbitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCreateComment = useCallback(
    async ({ name, email, body }: Omit<CommentData, 'postId'>) => {
      setIsSumbitting(true);

      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedBody = body.trim();

      if (trimmedName && trimmedEmail && trimmedBody && selectedPostId) {
        try {
          const newComment = await createComment({
            postId: selectedPostId,
            name: trimmedName,
            email: trimmedEmail,
            body: trimmedBody,
          });

          setComments(prevComments => [...prevComments, newComment]);
        } catch {
          setIsError(true);
        } finally {
          setIsSumbitting(false);
        }
      }
    },
    [selectedPostId, setIsError],
  );

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      try {
        await deleteComment(commentId);

        setComments(currentComments =>
          currentComments.filter(comm => comm.id !== commentId),
        );
      } catch {
        setIsError(true);
      }
    },
    [setIsError],
  );

  const handleSelectUser = useCallback(
    async (userId: number) => {
      setSelectedUserId(userId);
      setIsLoadingPosts(true);

      try {
        const loadedPosts = await getPosts(userId);

        setPosts(loadedPosts);
      } catch {
        setIsError(true);
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [setIsError],
  );

  const handleSelectPost = useCallback(
    async (postId: number) => {
      setSelectedPostId(postId);

      try {
        const loadedUsers = await getUsers();

        setUsers(loadedUsers);
      } catch {
        setIsError(true);
      }
    },
    [setIsError],
  );

  const handleLoadComments = useCallback(
    async (postId: number) => {
      setIsLoadingComments(true);
      // setIsError(false);

      try {
        const loadedComments = await getComments(postId);

        setComments(loadedComments);
      } catch {
        setIsError(true);
      } finally {
        setIsLoadingComments(false);
      }
    },
    [setIsError],
  );

  const handleClosePostDetails = useCallback(() => {
    setSelectedPostId(null);
  }, []);

  const selectedUser = useMemo(
    () => users?.find(user => user.id === selectedUserId) || null,
    [users, selectedUserId],
  );

  const selectedPost = useMemo(
    () => posts?.find(post => post.id === selectedPostId) || null,
    [posts, selectedPostId],
  );

  const sharedValue = useMemo(
    () => ({
      users,
      posts,
      comments,
      isError,
      selectedUser,
      selectedPost,
      isLoadingPosts,
      isLoadingComments,
      isSumbitting,
      handleCreateComment,
      handleDeleteComment,
      handleLoadComments,
      handleSelectUser,
      handleSelectPost,
      handleClosePostDetails,
    }),
    [
      users,
      posts,
      comments,
      isError,
      selectedUser,
      selectedPost,
      isLoadingPosts,
      isLoadingComments,
      isSumbitting,
      handleCreateComment,
      handleDeleteComment,
      handleLoadComments,
      handleSelectUser,
      handleSelectPost,
      handleClosePostDetails,
    ],
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loadedUsers = await getUsers();

        setUsers(loadedUsers);
      } catch {
        setIsError(true);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SharedContext.Provider value={sharedValue}>
      {children}
    </SharedContext.Provider>
  );
};

export const useValues = () => {
  const value = useContext(SharedContext);

  if (!value) {
    throw new Error('Something is wrong with provider SharedContext');
  }

  return value;
};
