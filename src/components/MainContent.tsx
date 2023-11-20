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

  let content;

  if (idUserActive === -1) {
    content = <p data-cy="NoSelectedUser">No user selected</p>;
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  } else if (posts.length === 0) {
    content = (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  } else {
    content = <PostsList posts={posts} />;
  }

  return (
    <div className="block" data-cy="MainContent">
      {content}
    </div>
  );
};
