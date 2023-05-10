import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getPostsByUser, getUsers, postInfo } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserPosts, setcurrentUserPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [isSideBarIsAlreadyOpen, setIsSideBarIsAlreadyOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [currentPostComments, setCurrentPostComments] = useState<Comment[]>([]);
  const [isCommentsLoaderIsShow, setisCommentsLoaderIsShow] = useState(false);
  const getPostInfo = () => {
    if (currentPost) {
      setisCommentsLoaderIsShow(true);

      postInfo(currentPost.id)
        .then((fetchedComments) => {
          setCurrentPostComments(fetchedComments);
          setisCommentsLoaderIsShow(false);
        })
        .catch(() => {
          setError('Cannot load post comments');
          setisCommentsLoaderIsShow(false);
        });
    }
  };

  useEffect(() => {
    getUsers()
      .then((fetchedUsers: User[]) => {
        setUsers(fetchedUsers);
        setError('');
      })
      .catch(() => {
        setError('Cannot load users');
      });
  }, []);
  useEffect(() => {
    if (selectedUser) {
      setShowLoader(true);

      getPostsByUser(selectedUser.id)
        .then((fetchedPosts) => {
          setcurrentUserPosts(fetchedPosts);
          setError('');
          setShowLoader(false);
        })
        .catch(() => {
          setError('Cannot load user posts');
          setShowLoader(false);
        });
    }
  }, [selectedUser]);
  useEffect(getPostInfo, [currentPost]);

  const showLoaderComponent = <Loader />;

  const showErrorComponent = (
    <div className="notification is-danger" data-cy="PostsLoadingError">
      {error}
    </div>
  );

  const showNoPostsComponent = (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );

  const PostsComponent = () => {
    if (!selectedUser) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (showLoader) {
      return <>{showLoaderComponent}</>;
    }

    if (error.length) {
      return <>{showErrorComponent}</>;
    }

    if (!currentUserPosts.length) {
      return <>{showNoPostsComponent}</>;
    }

    return (
      <PostsList
        posts={currentUserPosts}
        setSideBarIsOpen={setIsSideBarIsAlreadyOpen}
        setCurrentPost={setCurrentPost}
      />
    );
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedUser={setSelectedUser}
                  users={users}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <PostsComponent />
              </div>
            </div>
          </div>

          {isSideBarIsAlreadyOpen ? (
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
                  postComments={currentPostComments}
                  error={error}
                  showCommentsLoader={isCommentsLoaderIsShow}
                  post={currentPost}
                  getPostInfo={getPostInfo}
                  setPostComments={setCurrentPostComments}
                  setError={setError}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};
