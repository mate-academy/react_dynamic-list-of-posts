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
import {
  deleteComments,
  getComments,
  getPosts,
  getUsers,
} from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleUserSelect = (userId: number) => {
    setPostsError(false);
    setSelectedUserId(userId);
    setPosts([]);
    setSelectedPostId(null);
    setPostLoading(true);
    getPosts(userId)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setPostLoading(false));
  };

  const handlePostSelect = (postId: number) => {
    setCommentsError(false);
    setSelectedPostId(postId);
    setCommentsLoading(true);
    getComments(postId)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setCommentsLoading(false));
  };

  const handleClosePost = () => {
    setSelectedPostId(null);
    setComments([]);
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    deleteComments(commentId)
      .then(() => {})
      .catch(() => {});
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelectUser={handleUserSelect}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId && posts.length === 0 && !postsError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    onSelectPost={handlePostSelect}
                    onClosePost={handleClosePost}
                    selectedPostId={selectedPostId}
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
              { 'Sidebar--open': selectedPostId && selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  comments={comments}
                  post={selectedPost}
                  commentsLoading={commentsLoading}
                  commentsError={commentsError}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
