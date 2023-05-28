import React, { useCallback, useEffect, useState } from 'react';
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
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isErrorPost, setIsErrorPost] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadComment, setIsLoadComment] = useState(false);
  const [isLoadSideBar, setIsLoadSideBar] = useState(false);
  const [isErrorComment, setIsErrorComment] = useState(false);
  const isOpeningSideBar = isLoadSideBar && selectedPost && selectedUser;
  const isOpeningPostList = selectedUser && !isLoadingPost && !isErrorPost;

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
    setIsLoadingPost(true);
    setIsErrorPost(false);

    try {
      const dataPosts = await getPosts(userId);

      setPosts(dataPosts);
    } catch {
      setIsErrorPost(true);
    } finally {
      setIsLoadingPost(false);
    }
  };

  const handleSelectUser = useCallback((user: User) => {
    setIsLoadSideBar(false);
    setSelectedUser(user);
    loadPosts(user.id);
  }, []);

  const loadComments = async (postId: number) => {
    setIsLoadComment(true);
    setIsErrorComment(false);
    try {
      const dataComments = await getComments(postId);

      setComments(dataComments);
    } catch {
      setIsErrorComment(true);
    } finally {
      setIsLoadComment(false);
    }
  };

  const handleSelectPost = useCallback((post: Post | null) => {
    setIsLoadSideBar(true);
    setSelectedPost(post);

    if (post) {
      loadComments(post.id);
    }
  }, []);

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

                {isLoadingPost && (
                  <Loader />
                )}

                {isErrorPost && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(isOpeningPostList) && (
                  <>
                    {posts.length > 0 ? (
                      <PostsList
                        posts={posts}
                        handleSelectPost={handleSelectPost}
                        selectedPost={selectedPost}
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

          {(isOpeningSideBar) && (
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
                  isLoadComment={isLoadComment}
                  setIsErrorComment={setIsErrorComment}
                  isErrorComment={isErrorComment}
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
