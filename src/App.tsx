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
import { getUsers } from './api/Users';
import { Post } from './types/Post';
import { getPosts } from './api/Posts';
import { getComments } from './api/Comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User | null>(null);
  const [selectedUserName, setSelectedUserName] = useState('Choose a user');
  const [usersPosts, setUserPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [postComment, setPostComment] = useState<Comment[]>([]);

  const handleRequest = async () => {
    try {
      const allUsers = await getUsers();

      setUser(allUsers);
    } catch (errors) {
      setErrorMessage('Failed to load users.');
    } finally {
      setErrorMessage(null);
    }
  };

  const loadUserPosts = async (userId: number) => {
    try {
      setLoading(true);
      const posts = await getPosts(userId);

      setUserPosts(posts);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load user posts.');
    } finally {
      setLoading(false);
    }
  };

  const loadPostComments = async (postId: number) => {
    try {
      const comments = await getComments(postId);

      if (comments.length > 0) {
        setPostComment(comments);
      } else {
        throw Error('NoComments');
      }
    } catch (error) {
    } finally {
    }
  };

  const handlePostCommentSelect = (postId: Post) => {
    setPostComment(postComment);
    loadPostComments(postId.id);
  };

  useEffect(() => {
    handleRequest().finally(() => setLoading(false));
    setSelectedUsers(null);
  }, []);

  const handleUserSelect = (selectedUser: User) => {
    setSelectedUsers(selectedUser);
    setSelectedUserName(selectedUser.name);
    loadUserPosts(selectedUser.id);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onUserSelect={handleUserSelect}
                  users={user}
                  selectedUserName={selectedUserName}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUsers && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {selectedUsers && !loading && usersPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUsers && usersPosts.length > 0 && !loading && (
                  <PostsList
                    selectedUsers={selectedUsers}
                    usersPosts={usersPosts}
                    onPostCommentSelect={handlePostCommentSelect}
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
              'Sidebar--open',
            )}
          >
            {postComment.length > 0 && loading && (
              <div className="tile is-child box is-success ">
                <PostDetails postComment={postComment} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
