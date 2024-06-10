/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { UserContext } from '../context/UserContextProvider';
import { getPostsByUserId } from '../utils/httpClient';
import { Post } from '../types/Post';
import { UserLoaderContext } from '../context/UserLoaderContextProvider';

export const PostTemplate = () => {
  const { user } = useContext(UserContext);
  const { loading, setLoading } = useContext(UserLoaderContext);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      setError('');

      getPostsByUserId(user.id)
        .then((pos: Post[]) => {
          setPosts(pos);
        })
        .catch(() => {
          setError('Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <>
      {!user && <p data-cy="NoSelectedUser">No user selected</p>}

      {loading && <Loader />}

      {error && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {error}
        </div>
      )}

      {user && !loading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          ) : (
            <PostsList posts={posts} />
          )}
        </>
      )}
    </>
  );
};
