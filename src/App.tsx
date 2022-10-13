import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { getPostsByUserId } from './api/post';
import { Content } from './components/Content';
import { Sidebar } from './components/Sidebar';
import { Post } from './types/Post';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((errorType: Error | null) => {
    setError(errorType);
  }, []);

  const handleOnPost = useCallback((id: number | null) => {
    setPostId(id);
  }, []);

  const handleSelectUser = useCallback((userId: number) => {
    setSelectedUserId(userId);
    setPostId(null);
  }, []);

  const getPostList = async (userId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!userId) {
        return;
      }

      const postList = await getPostsByUserId(userId);

      if (!postList.length) {
        setError(Error.NO_POSTS);
      }

      setPosts(postList);
    } catch {
      setError(Error.GET_POSTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      getPostList(selectedUserId);
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <Content
            posts={posts}
            postId={postId}
            selectedUserId={selectedUserId}
            error={error}
            isLoading={isLoading}
            onPost={handleOnPost}
            onSelectUser={handleSelectUser}
            onError={handleError}
          />

          <Sidebar
            posts={posts}
            postId={postId}
            error={error}
            onError={handleError}
          />
        </div>
      </div>
    </main>
  );
};
