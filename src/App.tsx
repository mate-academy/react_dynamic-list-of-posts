import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    if (selectedUserId === null) {
      setPosts([]);
      setPostsError(false);
      setSelectedPostId(null);

      return () => {
        isCurrent = false;
      };
    }

    setPostsLoading(true);
    setPostsError(false);
    setPosts([]);
    setSelectedPostId(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(data => {
        if (isCurrent) {
          setPosts(data);
          setPostsLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setPostsError(true);
          setPostsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedUserId]);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handlePostSelect = (postId: number | null) => {
    setSelectedPostId(postId);
  };

  const selectedPost = posts.find(p => p.id === selectedPostId) || null;

  const showNoUserSelected = selectedUserId === null;
  const showPostsLoader = !showNoUserSelected && postsLoading;
  const showPostsError = !showNoUserSelected && postsError;
  const showNoPostsYet =
    !showNoUserSelected && !postsLoading && !postsError && posts.length === 0;
  const showPostsList =
    !showNoUserSelected && !postsLoading && !postsError && posts.length > 0;
  const showSidebar = selectedPostId !== null;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={handleUserSelect}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {showNoUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showPostsLoader && <Loader />}

                {showPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelect={handlePostSelect}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              showSidebar && 'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success">
              {showSidebar && <PostDetails post={selectedPost!} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
