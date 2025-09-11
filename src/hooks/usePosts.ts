import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts/postApi';
import { Post } from '../types/interfaces';
import { ErrorMessages } from '../types/ErrorMessages';
import { useUser } from './useUsers';

export const usePosts = (
  setCurrentError: React.Dispatch<React.SetStateAction<ErrorMessages | null>>,
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { users, selectedUser, handleSelectUser } = useUser(
    setIsOpenSidebar,
    setSelectedPost,
  );

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const loadPosts = async () => {
      setIsLoadingPosts(true);

      try {
        const post = await getPosts(selectedUser.id);

        setPosts(post);
      } catch (error) {
        setCurrentError(ErrorMessages.PostsLoadingError);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  return {
    posts,
    users,
    isLoadingPosts,
    isOpenSidebar,
    setIsOpenSidebar,
    selectedUser,
    selectedPost,
    setSelectedPost,
    handleSelectUser,
  };
};
