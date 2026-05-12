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
import { getPostComments, getUserPosts, getUsers } from './utils/api';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);

  function loadUsers() {
    getUsers()
      .then(setUsers)
      .catch(error => {
        setErrorMessage('Unable to load users');
        throw error;
      });
  }

  function loadUserPosts() {
    if (selectedUser) {
      setIsLoading(true);

      getUserPosts(selectedUser?.id)
        .then(setUserPosts)
        .catch(error => {
          setErrorMessage('Unable to load posts');
          throw error;
        })
        .finally(() => setIsLoading(false));
    }
  }

  function loadPostComments() {
    if (selectedPost) {
      setIsCommentsLoading(true);

      getPostComments(selectedPost?.id)
        .then(setPostComments)
        .catch(error => {
          setCommentErrorMessage('Unable to load comments');
          throw error;
        })
        .finally(() => setIsCommentsLoading(false));
    }
  }

  useEffect(loadUsers, []);
  useEffect(loadUserPosts, [selectedUser]);
  useEffect(loadPostComments, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={(value: User | null) => setSelectedUser(value)}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isLoading &&
                  !errorMessage &&
                  (userPosts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      userPosts={userPosts}
                      setSelectedPost={(value: Post | null) =>
                        setSelectedPost(value)
                      }
                      selectedPost={selectedPost}
                      setIsWritingComment={setIsWritingComment}
                    />
                  ))}
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
              {
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  postComments={postComments}
                  isCommentsLoading={isCommentsLoading}
                  commentErrorMessage={commentErrorMessage}
                  setComments={setPostComments}
                  isWritingComment={isWritingComment}
                  setIsWritingComment={setIsWritingComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
