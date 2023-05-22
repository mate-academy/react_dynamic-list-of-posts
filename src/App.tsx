import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getComments, getPosts, getUsers } from './api/posts';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isUsersShown, setIsUsersShown] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentError, setIsCommentError] = useState(false);
  const [canWriteComment, setCanWriteComment] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsersFromServer = useCallback(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const getPostsFromServer = (userId: number) => {
    setIsPostsLoading(true);

    getPosts(userId)
      .then((data => {
        setPosts(data);
        setIsLoadingError(false);
      }))
      .catch(() => {
        setIsLoadingError(true);
      })
      .finally(() => setIsPostsLoading(false));
  };

  const getCommentsFromServer = (postId: number) => {
    getComments(postId)
      .then(data => {
        setComments(data);
        setIsCommentError(false);
      })
      .catch(() => setIsCommentError(true));
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  const handleUserDisplay = () => {
    setIsUsersShown(currState => !currState);
  };

  const handleUserSelection = (user: User) => {
    getPostsFromServer(user.id);
    setSelectedUser(user);
    setIsUsersShown(false);
    setSelectedPost(null);
  };

  const handlePostsDetails = (post: Post) => {
    setSelectedPost(currState => {
      if (currState?.id === post.id) {
        return null;
      }

      setComments(null);

      return post;
    });
  };

  const handleLoadDetails = (postId: number) => {
    getCommentsFromServer(postId);
    setCanWriteComment(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onDisplay={handleUserDisplay}
                  isUsersShown={isUsersShown}
                  onSelect={handleUserSelection}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!posts && !isPostsLoading && !isLoadingError && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {isLoadingError && !isPostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts && posts?.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onShow={handlePostsDetails}
                    onLoad={handleLoadDetails}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isCommentError={isCommentError}
                  onError={setIsCommentError}
                  canWriteComment={canWriteComment}
                  setCanWriteComment={setCanWriteComment}
                  onAdd={setComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
