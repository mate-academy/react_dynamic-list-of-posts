import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './utils/fetch_Users';
import { Comment } from './types/Comment';
import './App.scss';

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromApi => setUsers(usersFromApi))
      .catch(() => setLoadingError('Something went wrong!'));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setLoadingError={setLoadingError}
                  users={users}
                  setPosts={setPosts}
                  setSelectedPost={setSelectedPost}
                  setIsStarted={setIsStarted}
                  setIsPostsLoaded={setIsPostsLoaded}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!isStarted
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )}

                {(isStarted && !isPostsLoaded)
                  && <Loader />}

                {loadingError
               && (
                 <div
                   className="notification is-danger"
                   data-cy="PostsLoadingError"
                 >
                   {loadingError}
                 </div>
               )}

                {(isStarted && !posts.length && isPostsLoaded)
                && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {(posts.length > 0 && isPostsLoaded)
                && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setLoadingError={setLoadingError}
                    setComments={setComments}
                    setIsCommentsLoaded={setIsCommentsLoaded}
                  />
                )}
              </div>
            </div>
          </div>
          {selectedPost
          && (
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

              <div className="tile is-child box is-success ">
                <PostDetails
                  isCommentsLoaded={isCommentsLoaded}
                  selectedPost={selectedPost}
                  loadingError={loadingError}
                  comments={comments}
                  setComments={setComments}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
