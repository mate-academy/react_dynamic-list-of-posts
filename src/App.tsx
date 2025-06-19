import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { useEffect, useState } from 'react';

import { User } from './entities/User';
import { Post } from './entities/Post';

import { getUsers } from './entities/User/user.service';
import { getUserPosts } from './entities/Post/post.service';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const noPostsToShow = selectedUser && !loading && userPosts?.length === 0;
  const showPosts = !loading && userPosts !== null && userPosts.length > 0;

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setSelectedPost(null);
      setErrorMessage('');
      setLoading(true);
      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {noPostsToShow && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {showPosts && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
