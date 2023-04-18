import { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments } from './api/comments';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingError, setIsProcessingError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const isVisiblePostList = !!postsList.length;

  useEffect(() => {
    const getUsersFromServer = async () => {
      try {
        setIsLoading(true);
        const usersData = await getUsers();

        setUsersList(usersData);
      } catch {
        setIsProcessingError(true);
      } finally {
        setIsLoading(false);
        setIsProcessingError(false);
      }
    };

    getUsersFromServer();
  }, []);

  useEffect(() => {
    const getUsertPostList = async () => {
      try {
        setIsLoading(true);
        if (selectedUser) {
          const postsData = await getPosts(selectedUser.id);

          setPostsList(postsData);
        }
      } catch {
        setIsProcessingError(true);
      } finally {
        setIsLoading(false);
        setIsProcessingError(false);
      }
    };

    getUsertPostList();
  }, [selectedUser]);

  useEffect(() => {
    const getCommentsToPost = async () => {
      try {
        setIsLoading(true);
        if (selectedPost) {
          const commentsData = await getComments(selectedPost.id);

          setCommentsList(commentsData);
        }
      } catch {
        setIsProcessingError(true);
      } finally {
        setIsLoading(false);
        setIsProcessingError(false);
      }
    };

    getCommentsToPost();
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={usersList}
                  userName={selectedUser?.name}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                { !selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { isLoading && <Loader /> }
                { isProcessingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                { isVisiblePostList
                 && (
                   <PostsList
                     postsList={postsList}
                     selectedPost={selectedPost}
                     setSelectedPost={setSelectedPost}
                   />
                 )}

                {(selectedUser && !isVisiblePostList) && (
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
            { selectedPost && (
              <PostDetails
                selectedPost={selectedPost}
                commentsList={commentsList}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
