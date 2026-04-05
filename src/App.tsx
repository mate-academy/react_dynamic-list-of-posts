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
import { getPostComments, getPosts, getUsers } from './services/services';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import React from 'react';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorDownloadUsers, setErrorDownloadUsers] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorDownloadPosts, setErrorDownloadPosts] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPostDetails, setLoadingPostDetails] = useState(false);
  const [errorDownloadPostDetails, setErrorDownloadPostDetails] =
    useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState(false);

  function loadUsers() {
    getUsers()
      .then(setUsers)
      .catch(() => setErrorDownloadUsers(true));
  }

  useEffect(loadUsers, []);

  function loadPostsByUser(user: User | null) {
    if (!user) {
      setPosts([]);

      return;
    }

    setLoadingPosts(true);
    const userId = String(user.id);

    getPosts(userId)
      .then(setPosts)
      .catch(() => setErrorDownloadPosts(true))
      .finally(() => setLoadingPosts(false));
  }

  useEffect(() => {
    if (selectedUser) {
      loadPostsByUser(selectedUser);
    }
  }, [selectedUser]);

  function loadPostComments(post: Post | null) {
    if (!post) {
      setComments([]);

      return;
    }

    setLoadingPostDetails(true);
    const postId = String(post.id);

    getPostComments(postId)
      .then(setComments)
      .catch(() => setErrorDownloadPostDetails(true))
      .finally(() => setLoadingPostDetails(false));
  }

  useEffect(() => {
    if (selectedPost) {
      loadPostComments(selectedPost);
    }
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              {errorDownloadUsers && (
                <div className="notification is-danger">
                  <p>Cant download users!</p>
                </div>
              )}

              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !errorDownloadUsers && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {errorDownloadPosts && !loadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong, cant download posts
                  </div>
                )}

                {posts.length === 0 &&
                  !loadingPosts &&
                  !errorDownloadPosts &&
                  selectedUser && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !loadingPosts &&
                  !errorDownloadPosts &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      isOpenPost={isOpenPost}
                      onSelectedPost={setSelectedPost}
                      onPostOpen={setIsOpenPost}
                      setIsOpenCommentForm={setIsOpenCommentForm}
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
              { 'Sidebar--open': selectedPost && isOpenPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  setComments={setComments}
                  loadingPostDetails={loadingPostDetails}
                  errorDownloadPostDetails={errorDownloadPostDetails}
                  isOpenCommentForm={isOpenCommentForm}
                  setIsOpenCommentForm={setIsOpenCommentForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
