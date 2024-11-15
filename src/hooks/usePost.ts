import { useLayoutEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

export const usePosts = (selectedUser: User | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsError, setPostsError] = useState<null | string>(null);
  const [isLoadingPosts, setLoadingPosts] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);
      getUserPosts(selectedUser.id)
        .then(res => {
          if (Array.isArray(res)) {
            setPosts(res);
          } else {
            setPostsError('Fetch post with error');
          }
        })
        .catch((error: Error) => {
          setPostsError(error.message);
        })
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  return { posts, postsError, isLoadingPosts };
};
