// #region imports
import React, { memo, useEffect, useState } from 'react';
import { getUserPosts } from '../services/posts';
import { Post } from '../types/Post';
import { ErrorNotification } from './ErrorNotification';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
// #endregion

type Props = {
  userId: number | null;
  selectedPostId: number | null;
  onPostSelect: (post: Post | null) => void;
};

export const UserPosts: React.FC<Props> = memo(function UserPosts({
  userId,
  selectedPostId,
  onPostSelect,
}) {
  // #region states
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // #endregion

  useEffect(() => {
    if (!userId) {
      return;
    }

    setIsError(false);
    setIsLoading(true);

    getUserPosts(userId)
      .then(setPosts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  return (
    <>
      {isLoading && <Loader />}

      {isError && <ErrorNotification errorMessage="Something went wrong!" />}

      {!isLoading &&
        !isError &&
        (!posts.length ? (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        ) : (
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            onPostSelect={onPostSelect}
          />
        ))}
    </>
  );
});
