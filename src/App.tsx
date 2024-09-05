import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './api/Posts';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postDetais, setPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      setSelectedPost(null);
      if (selectedUser) {
        setLoader(true);
        setErrorMessage('');
        setShowNoPostsMessage(false);
        try {
          const posts = await getUserPosts(selectedUser.id);

          setUserPosts(posts);
          setShowNoPostsMessage(posts.length === 0);
        } catch (error: any) {
          setErrorMessage('Something went wrong!');
        } finally {
          setLoader(false);
        }
      }
    };

    fetchUserPosts();
  }, [selectedUser]);

  useEffect(() => {}, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <></>
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loader && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {showNoPostsMessage && selectedUser && !loader && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!loader && selectedUser && userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    setPostDetails={setPostDetails}
                    postDetais={postDetais}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
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
              {selectedPost && <PostDetails selectedPost={selectedPost} />}{' '}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
