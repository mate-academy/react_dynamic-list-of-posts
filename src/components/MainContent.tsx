import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { ListContext } from './ListContext';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';
import { PostsList } from './PostsList';

export const MainContent: React.FC = () => {
  const {
    idUserActive,
    errorMessagePosts,
    setErrorMessagePosts,
    isLoading,
    setIsLoading,
  } = useContext(ListContext);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts(idUserActive).then(postsFromServer => {
      setPosts(postsFromServer);
      setIsLoading(false);
    })
      .catch(() => {
        setErrorMessagePosts('Something went wrong!');
      });
  }, [idUserActive]);

  return (
    <div className="block" data-cy="MainContent">
      {idUserActive === -1 && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {isLoading && <Loader />}

      {errorMessagePosts !== '' && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          {errorMessagePosts}
        </div>
      )}

      {
        (posts.length === 0 && idUserActive !== -1 && !isLoading) && (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>

        )
      }

      {posts.length !== 0 && <PostsList posts={posts} />}
    </div>
  );
};
