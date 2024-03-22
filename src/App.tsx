import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import cn from 'classnames';
import './App.scss';
import { getUsers, getUserPosts } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDropDownShown, setIsDropDownShown] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddFormShown, setIsAddFormShown] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const noPosts =
    isUserSelected && !posts.length && !postsLoadingError && !loading;

  const getPosts = useCallback((userId: number) => {
    setPostsLoadingError(false);
    setLoading(true);

    setPosts([]);
    getUserPosts(userId)
      .then(setPosts)
      .catch(error => {
        setPostsLoadingError(true);
        throw error;
      })
      .finally(() => {
        setLoading(false);
        setIsUserSelected(true);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isDropDownShown={isDropDownShown}
                  setIsDropDownShown={setIsDropDownShown}
                  users={users}
                  getPosts={getPosts}
                  setIsUserSelected={setIsUserSelected}
                  setIsSideBarOpen={setIsSideBarOpen}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {loading && <Loader />}
                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {isUserSelected && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    isSideBarOpen={isSideBarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setIsAddFormShown={setIsAddFormShown}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': isSideBarOpen,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isAddFormShown={isAddFormShown}
                  setIsAddFormShown={setIsAddFormShown}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
