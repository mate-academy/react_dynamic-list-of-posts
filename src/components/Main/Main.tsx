import { useCallback, useEffect, useState } from 'react';
import { getPostsOfUser } from '../../api/mate';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';
import { User } from '../../types/User';

interface Props {
  selectedUser: User;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const Main: React.FC<Props> = ({
  selectedUser,
  selectedPost,
  setSelectedPost,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostsFromServer = useCallback(async (userId) => {
    setIsLoading(true);
    setShowError(false);
    try {
      const result = await getPostsOfUser(userId);

      setPosts(result);
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getPostsFromServer(selectedUser.id);
    }
  }, [selectedUser]);

  return (
    <div className="block" data-cy="MainContent">

      {showError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {isLoading && <Loader />}

      {!isLoading && !showError && (
        <PostsList
          posts={posts}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
    </div>
  );
};
