/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import {
  getAllUsers, getUserPosts, getUserPostById,
} from './utils/requestService';
import { User } from './types/User';
import { Post } from './types/Post';
// import { Comment } from './types/Comment';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);
  const [postAside, setPostAside] = useState<Post>();
  // const [errorM, setErrorM] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then((data) => setUserPosts(data));
  }, [selectedUser]);

  useEffect(() => {
    setIsLoading(true);

    getUserPostById(selectedPost)
      .then((data) => setPostAside(data))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersFromServer={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser
                  ? ''
                  : <p data-cy="NoSelectedUser">No user selected</p>}

                {isLoading
                  && <Loader />}

                {/* {errorM
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )} */}

                {!!selectedUser
                  && (
                    <>
                      {userPosts.length > 0
                        ? (
                          <PostsList
                            userPosts={userPosts}
                            setSelectedPost={setSelectedPost}
                          />
                        )
                        : (
                          <div className="notification is-warning" data-cy="NoPostsYet">
                            No posts yet
                          </div>
                        )}
                    </>
                  )}
              </div>
            </div>
          </div>

          {!!selectedPost && !!postAside
            && (
              <div
                data-cy="Sidebar"
                className={cn(
                  'tile',
                  'is-parent',
                  'is-8-desktop',
                  'Sidebar',
                  'Sidebar--open',
                )}
              >
                <div className="tile is-child box is-success ">
                  <PostDetails
                    post={postAside}
                    selectedPost={selectedPost}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
};
