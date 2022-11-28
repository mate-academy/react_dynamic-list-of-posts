import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { User } from './types/User';
import { UsersProvider } from './components/UserContext';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const LoadPosts = async (userId: number) => {
    setLoaded(false);
    try {
      const loadedPosts = await client.get<Post[]>(`/posts?userId=${userId}`);

      setPosts(loadedPosts);
      setLoaded(true);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    setSelectedPost(null);

    if (user) {
      LoadPosts(user.id);
    } else {
      setPosts([]);
    }
  }, [user?.id]);

  return (
    <UsersProvider>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector
                    value={user}
                    onChange={setUser}
                  />
                </div>

                <div className="block" data-cy="MainContent">
                  {!user && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                  {user && !loaded && (
                    <Loader />
                  )}

                  {user && loaded && hasError && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                  {user && loaded && !hasError && posts.length === 0 && (
                    <div className="notification is-warning">
                      No posts yet
                    </div>
                  )}

                  {user && loaded && !hasError && posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
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
                { 'Sidebar--open': selectedPost },
              )}
            >
              <div className="tile is-child box is-success ">
                {selectedPost ? (
                  <PostDetails post={selectedPost} />
                ) : (
                  <p>Choose a post</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </UsersProvider>
  );
};
