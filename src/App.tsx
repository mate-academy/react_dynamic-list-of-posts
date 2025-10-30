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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPostsFromUser } from './api/posts';
import { Status } from './types/Status';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [status, setStatus] = useState<Status>('idle');

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const [openForm, setOpenForm] = useState(false);

  function handlePosts(userId: number) {
    setSelectedPostId(0);
    setStatus('loading');
    getPostsFromUser(userId)
      .then(data => {
        setPosts(data);
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  }

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setStatus('error');
      });
  }, []);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserIdSelector={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  onPosts={handlePosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {status === 'loading' && <Loader />}

                {status === 'error' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {status === 'success' && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {status === 'success' && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onSelectedPostId={setSelectedPostId}
                    selectedPostId={selectedPostId}
                    setOpenForm={setOpenForm}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
