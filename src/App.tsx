import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import {
  getComments,
  getPosts,
  getUsers,
} from './api/services';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorPost, setErrorPost] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadComment, setLoadComment] = useState(false);
  const [loadSideBar, setLoadSideBar] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  const loadUsers = async () => {
    try {
      const dataUsers = await getUsers();

      setUsers(dataUsers);
    } catch {
      throw new Error('Error');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (userId: number) => {
    setLoadingPost(true);
    setErrorPost(false);

    try {
      const dataPosts = await getPosts(userId);

      setPosts(dataPosts);
    } catch {
      setErrorPost(true);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleSelectUser = (user: User) => {
    setLoadSideBar(false);
    setSelectedUser(user);
    loadPosts(user.id);
  };

  const loadComments = async (postId: number) => {
    setLoadComment(true);
    setErrorComment(false);
    try {
      const dataComments = await getComments(postId);

      setComments(dataComments);
    } catch {
      setErrorComment(true);
    } finally {
      setLoadComment(false);
    }
  };

  const handleSelectPost = (post: Post) => {
    setLoadSideBar(true);
    setSelectedPost(post);
    loadComments(post.id);
  };

  // useEffect(() => {
  //   if (selectedPost?.id) {
  //     setLoadSideBar(true);
  //   } else {
  //     setLoadSideBar(false);
  //   }
  // }, [selectedPost?.id]);

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
                  handleSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loadingPost && (
                  <Loader />
                )}

                {errorPost && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(selectedUser && !loadingPost && !errorPost) && (
                  <>
                    {posts.length > 0 ? (
                      <PostsList
                        posts={posts}
                        handleSelectPost={handleSelectPost}
                        // selectId={selectedPost}
                      />
                    ) : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {loadSideBar && (
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
                  selectedPost={selectedPost}
                  comments={comments}
                  loading={loadComment}
                  error={errorComment}
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
