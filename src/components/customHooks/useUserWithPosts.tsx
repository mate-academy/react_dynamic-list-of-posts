import { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getPostsOfUser } from '../API/Posts';

export const useUserWithPosts = ():[
  User | null,
  Post[] | null,
  boolean,
  boolean,
  ((userFromServer: User) => void),
] => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadingError, setLoadingError] = useState(false);
  const [postsIsLoading, setPostsIsloading] = useState(false);

  useEffect(() => {
    if (user) {
      setPostsIsloading(true);
      setLoadingError(false);

      getPostsOfUser(user.id)
        .then(result => setPosts(result))
        .catch(() => {
          setLoadingError(true);
        })
        .finally(() => {
          setPostsIsloading(false);
        });
    }
  }, [user]);

  return [user, posts, postsIsLoading, loadingError, setUser];
};
