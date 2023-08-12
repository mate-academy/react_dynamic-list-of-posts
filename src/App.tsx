import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { getComments, getPosts, getUsers } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [isErrorPosts, setIsErrorPosts] = useState<boolean>(false);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isErrorComments, setIsErrorComments] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isFormShown, setIsFormShown] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsErrorPosts(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingUsers(true);

      getPosts(selectedUser.id)
        .then((resolve) => {
          setPosts(resolve);
        })
        .catch(() => {
          setIsErrorPosts(true);
        })
        .finally(() => {
          setIsLoadingUsers(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      getComments(selectedPost.id)
        .then((resolve) => {
          setComments(resolve);
        })
        .catch((error: PromiseRejectedResult) => {
          setIsErrorComments(true);
          throw new Error(error.status);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
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
                  setSelectedPost={setSelectedPost}
                  setComments={setComments}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !isErrorPosts && !isLoadingUsers && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingUsers && <Loader />}

                {!isLoadingUsers && isErrorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoadingUsers && posts && posts.length < 1 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoadingUsers && posts && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setIsFormShown={setIsFormShown}
                    setSelectedPost={setSelectedPost}
                    setIsLoadingComments={setIsLoadingComments}
                    setIsErrorComments={setIsErrorComments}
                    setComments={setComments}
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
              {comments && selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isErrorComments={isErrorComments}
                  isLoadingComments={isLoadingComments}
                  setComments={setComments}
                  setIsErrorComments={setIsErrorComments}
                  setIsFormShown={setIsFormShown}
                  isFormShown={isFormShown}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
