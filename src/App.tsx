import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
// import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsIsLoading, setPostsIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then((fetchUsers) => setUsers(fetchUsers))
      .catch(() => setErrorMsg('Something went wrong!'));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPost(null);

    setPostsIsLoading(true);

    client.get<Post[]>(`/posts?userId=${selectedUser?.id}`)
      .then((fetchPosts) => setPosts(fetchPosts))
      .catch(() => setErrorMsg('Something went wrong!'))
      .finally(() => setPostsIsLoading(false));
  }, [selectedUser?.id]);

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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postsIsLoading && selectedUser && (
                  <Loader />
                )}

                {!postsIsLoading && errorMsg && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMsg}
                  </div>
                )}

                {posts.length === 0 && !postsIsLoading
                  && !errorMsg && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !postsIsLoading && !errorMsg && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
