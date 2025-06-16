import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import * as ClientAPI from '../api/clientApi';
import { User } from '../types/User';

export const usePosts = (selectedUser: User | null) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);

  const isEmptyPosts = posts !== null && posts.length === 0;
  const isPostsReady = posts !== null && posts.length > 0;

  const shouldShowNoPosts = !isPostsLoading && !isPostsError && isEmptyPosts;
  const shouldShowPostsList = !isPostsLoading && !isPostsError && isPostsReady;

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setIsPostsError(false);
    setSelectedPost(null);
    setPosts(null);

    setIsPostsLoading(true);
    ClientAPI.getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => {
        setIsPostsError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  return {
    posts,
    selectedPost,
    setSelectedPost,
    isPostsLoading,
    isPostsError,
    shouldShowNoPosts,
    shouldShowPostsList,
  };
};
