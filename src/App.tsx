import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    setError(false);

    if (user) {
      setLoading(true);
      setSelectedPost(undefined);

      getPosts(user.id)
        .then(setPosts)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector setUser={setUser} selectedUser={user} />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {user && loading && <Loader />}

                {user && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!error && !loading && posts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loading && posts && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success">
                <PostDetails selectedPost={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
