import classNames from 'classnames';

import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers, getPostsByUser } from './api';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { MainContent } from './components/MainContent';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setSelectedPost(null);
    setPostsLoading(true);
    setPostsError(false);

    getPostsByUser(selectedUserId)
      .then(setPosts)
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={setSelectedUserId}
                />
              </div>

              <MainContent
                selectedUserId={selectedUserId}
                posts={posts}
                loading={postsLoading}
                error={postsError}
                selectedPostId={selectedPost?.id || 0}
                onSelectPost={setSelectedPost}
              />
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
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
