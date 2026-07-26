import cn from 'classnames';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isUsersError, setIsUsersError] = useState(false);

  const handleSelectUser = (user: User | null) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handleSelectPost = (post: Post | null) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    setIsUsersError(false);

    client
      .get<User[]>('/users')
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        setIsUsersError(true);
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);

      return;
    }

    setIsLoading(true);
    setIsError(false);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(data => {
        setPosts(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  onSelect={handleSelectUser}
                />
              </div>

              {isUsersError && (
                <div className="notification is-danger">
                  Unable to load users
                </div>
              )}

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isError && !isLoading && selectedUser && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !isLoading && !isError && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost !== null,
            })}
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
