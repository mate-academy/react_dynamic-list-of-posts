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
import { getUserPosts, getUsers } from './api/client';
import { formatPosts, formatUsers } from './utils/formatData';
import { UserResponse } from './types/UserResponse';
import { Notification } from './components/Notification';
import { PostResponse } from './types/PostResponse';
import { NewCommentForm } from './components/NewCommentForm';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const [isPostsError, setIsPostsError] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(formatUsers(res as UserResponse[]));
      });
  }, []);

  useEffect(() => {
    if (user) {
      getUserPosts(user.id)
        .then((res) => {
          setPosts(formatPosts(res as PostResponse[]));
        })
        .catch(() => {
          setIsPostsError(true);
        })
        .finally(() => {
          setIsPostsLoading(false);
        });
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  user={user}
                  setUser={setUser}
                  users={users}
                  setIsPostsLoading={setIsPostsLoading}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isPostsLoading && <Loader />}
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {!isPostsLoading && user && (
                  <>
                    {posts ? (
                      <PostsList
                        posts={posts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        setIsNewCommentForm={setIsNewCommentForm}
                        setIsCommentsError={setIsCommentsError}
                      />
                    ) : (
                      <Notification
                        title="No posts yet"
                        dataCy="NoPostsYet"
                        isImportant={false}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {selectedPost && (
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
                <PostDetails
                  selectedPost={selectedPost}
                  setIsNewCommentForm={setIsNewCommentForm}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  setIsCommentsError={setIsCommentsError}
                />
                {isNewCommentForm && (
                  <NewCommentForm
                    selectedPost={selectedPost}
                    setNewComment={setNewComment}
                    setIsCommentsError={setIsCommentsError}
                  />
                )}
                {(isPostsError || isCommentsError) && (
                  <Notification
                    isImportant
                    dataCy={
                      isPostsError ? 'PostsLoadingError' : 'CommentsError'
                    }
                    title="Something went wrong"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
