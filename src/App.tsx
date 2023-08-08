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
import { Comment } from './types/Comment';
import { getComments, getPosts, getUsers } from './api/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorGetPosts, setErrorGetPosts] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorGetComments, setErrorGetComments] = useState(false);
  const [activeForm, setActiveForm] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => 'Error get Users');
  }, []);

  useEffect(() => {
    setErrorGetPosts(false);
    if (selectedUser) {
      setIsLoadingPosts(true);
      getPosts(selectedUser.id)
        .then(gettedPosts => {
          setComments([]);
          setSelectedPost(null);
          setPosts(gettedPosts);
        })
        .catch(() => {
          setErrorGetPosts(true);
        })
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    setErrorGetComments(false);
    setActiveForm(null);
    if (selectedPost) {
      setIsLoadingComments(true);
      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => {
          setErrorGetComments(true);
        })
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPost]);

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

                {isLoadingPosts && (
                  <Loader />
                )}

                {selectedUser && !isLoadingPosts && errorGetPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoadingPosts && !errorGetPosts
                && posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}

                {selectedUser && !isLoadingPosts && !errorGetPosts
                && posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
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
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isLoadingComments={isLoadingComments}
                  error={errorGetComments}
                  setError={setErrorGetComments}
                  comments={comments}
                  setComments={setComments}
                  activeForm={activeForm}
                  setActiveForm={setActiveForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
