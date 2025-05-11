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
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUsers = () => {
    setIsLoading(true);
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(error => {
        setErrorMessage(error.message);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadPosts = () => {
    if (!selectedUser) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setPosts([]);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(loadedPosts => {
        setPosts(loadedPosts);
        if (loadedPosts.length === 0) {
          setErrorMessage('No posts yet');
        }
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(selectedPost?.id === post.id ? null : post);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadPosts();
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelect={user => {
                    setSelectedUser(user);
                    setSelectedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : isLoading ? (
                  <Loader />
                ) : errorMessage ? (
                  <div
                    className={classNames(
                      'notification',
                      errorMessage === 'No posts yet'
                        ? 'is-warning'
                        : 'is-danger',
                    )}
                    data-cy={
                      errorMessage === 'No posts yet'
                        ? 'NoPostsYet'
                        : 'PostsLoadingError'
                    }
                  >
                    {errorMessage}
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostClick={handlePostClick}
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
              selectedPost ? 'Sidebar--open' : '',
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
