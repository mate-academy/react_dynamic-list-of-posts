import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { ContextUsers } from './components/UsersContext';
import { User } from './types/User';
import { getUsers } from './components/api/getUsers';
import { getPosts } from './components/api/getPosts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const { userSelected } = useContext(ContextUsers);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  // const [errInLoadingPosts, setErrInLoadingPosts] = useState(false);
  const [isLoadingPosts, setIsloadingPosts] = useState(false);
  const [visiblePost, setVisiblePost] = useState(false);
  const { openSidebar, errInLoadingPosts, setErrInLoadingPosts } =
    useContext(ContextUsers);

  //@dev for load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      await getUsers().then(respond => setUsers(respond));
    };

    loadUsers();
  }, []);
  // @dev load post when user is selected
  useEffect(() => {
    const loadPosts = async () => {
      if (userSelected) {
        try {
          setIsloadingPosts(true);
          await getPosts(userSelected.id).then(respond => {
            setPosts(respond);
            setVisiblePost(true);
          });
        } catch (error) {
          setErrInLoadingPosts(true);
        } finally {
          setIsloadingPosts(false);
        }
      }
    };

    loadPosts();
  }, [setErrInLoadingPosts, userSelected]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {errInLoadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {visiblePost && (
                  <>
                    {!posts.length && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                    {!!posts.length && <PostsList posts={posts} />}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': openSidebar,
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
