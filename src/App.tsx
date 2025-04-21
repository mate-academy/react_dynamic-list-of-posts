import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const fetchPosts = async () => {
      setErrorMessage('');

      const delayTimer = setTimeout(() => setLoading(true), 200);

      try {
        const response = await getPosts(selectedUser.id);

        setPosts(response);
      } catch (error) {
        setErrorMessage('Something went wrong!');
        // throw error;
      } finally {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
        setSelectedPost(null);
      }
    };

    fetchPosts();
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {!loading && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!loading && Boolean(!posts.length) && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loading && Boolean(posts.length) && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': Boolean(selectedPost),
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  key={selectedPost?.id}
                  selectedPost={selectedPost}
                  selectedUser={selectedUser}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
