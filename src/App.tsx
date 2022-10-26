import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { getPostsByUserId } from './api/post';
import { switchError } from './utils/switchError';
import { UserSelector } from './components/UserSelector';
import { ErrorNotification } from './components/ErrorNotification';
import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader';
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
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUserId={selectedUserId}
                  onSelectUser={handleSelectUser}
                  onError={handleError}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUserId
                  && !error
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {error
                  && switchError(error) === 'PostsLoadingError'
                  && (
                    <ErrorNotification
                      error={error}
                    />
                  )}

                {!posts?.length
                  && selectedUserId
                  && error === Error.NO_POSTS
                  && (
                    <ErrorNotification
                      error={error}
                    />
                  )}

                {isLoading
                  ? <Loader />
                  : posts.length > 0
                    && (
                      <PostsList
                        posts={posts}
                        postId={postId}
                        onPost={handleOnPost}
                      />
                    )}
              </div>
            </div>
          </div>

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
