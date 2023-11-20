import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { ListContext } from './ListContext';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';
import { PostsList } from './PostsList';

export const MainContent: React.FC = () => {
  const {
    idUserActive,
  } = useContext(ListContext);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (idUserActive !== -1) {
      setIsLoading(true);
      setIsError(false);

      getPosts(idUserActive).then(postsFromServer => {
        setPosts(postsFromServer);
        setIsLoading(false);
        setIsError(false);
      })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [idUserActive]);

  if (idUserActive === -1) {
    return (
      <div className="block" data-cy="MainContent">
        <p data-cy="NoSelectedUser">No user selected</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="block" data-cy="MainContent">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="block" data-cy="MainContent">
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      </div>
    );
  }

  return (
    <div className="block" data-cy="MainContent">
      <PostsList posts={posts} />
    </div>
  );
};
