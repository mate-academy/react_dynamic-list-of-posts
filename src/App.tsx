import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { getComments, removeComment } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [isAddingNewComment, setIsAddingNewComment] = useState(false);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res));
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setIsLoadingPosts(true);
    setPosts([]);
    setSelectedPost(null);
    setComments([]);
    setPostsLoadingError(false);
  };

  useEffect(() => {
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(postsFromServer => setPosts(postsFromServer))
        .catch(() => setPostsLoadingError(true))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);
      setIsAddingNewComment(false);

      getComments(selectedPost.id)
        .then(commentsFromServer => setComments(commentsFromServer))
        .catch(() => setCommentsLoadingError(true))
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPost]);

  const createNewComment = () => {
    setIsAddingNewComment(true);
  };

  const addComment = (newComment: Comment) => {
    setComments([
      ...comments,
      newComment,
    ]);
  };

  const deleteComment = (commentId: number) => {
    setComments(comments
      .filter(comment => comment.id !== commentId));

    removeComment(commentId);
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
                  selectedUser={selectedUser}
                  selectUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && <Loader />}

                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length
                  && !isLoadingPosts
                  && selectedUser
                  && !postsLoadingError
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser
                  && !postsLoadingError
                  && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setCommentsLoadingError={setCommentsLoadingError}
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
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsLoadingError={commentsLoadingError}
                  createNewComment={createNewComment}
                  isAddingNewComment={isAddingNewComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
