import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { getComments } from './api/commets';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [userSelect, setUserSelect] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isPostError, setIsPostError] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [postIdComments, setPostIdComments] = useState<number | null>(null);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isCommentError, setIsCommentError] = useState(false);

  const [isNewComment, setIsNewComment] = useState(false);

  const fetchUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUserSelect(usersFromServer);
    } catch (error) {
      setIsPostError(true);
    }
  };

  const fetchPosts = async (id: number) => {
    try {
      const postsFromServer = await getPosts(id);

      setUserPosts(postsFromServer);
    } catch (error) {
      setIsPostError(true);
    }
  };

  const fetchComments = async (id: number) => {
    try {
      const commentsFromServer = await getComments(id);

      setPostComments(commentsFromServer);
    } catch (error) {
      setIsCommentError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const postsReady = selectedUser && !isPostsLoading;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userSelect={userSelect}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  fetchPosts={fetchPosts}
                  setIsPostsLoading={setIsPostsLoading}
                  setPostIdComments={setPostIdComments}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isPostError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : (
                  <>
                    {!selectedUser && (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )}

                    {isPostsLoading && (
                      <Loader />
                    )}

                    {postsReady && (
                      (userPosts.length > 0) ? (
                        <PostsList
                          userPosts={userPosts}
                          setPostIdComments={setPostIdComments}
                          postIdComments={postIdComments}
                          fetchComments={fetchComments}
                          setIsCommentsLoading={setAreCommentsLoading}
                        />
                      ) : (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {postIdComments && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                ({ 'Sidebar--open': postIdComments }),
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  isCommentError={isCommentError}
                  postComments={postComments}
                  postIdComments={postIdComments}
                  userPosts={userPosts}
                  setPostComments={setPostComments}
                  isCommentsLoading={areCommentsLoading}
                  setIsNewComment={setIsNewComment}
                  isNewComment={isNewComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
