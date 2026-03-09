import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUsers } from './utils/users';
import { User } from './types/User';
import { getPosts } from './utils/posts';
import { Post } from './types/Post';
import { deleteComments, getComments } from './utils/comments';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const handleUserSelect = (id: number) => {
    setSelectedUserId(id);
    setSelectedPost(null);
    setPostsError(false);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    const commentToDelete = comments.find(c => c.id === commentId);

    setComments(prev => prev.filter(c => c.id !== commentId));

    deleteComments(commentId).catch(() => {
      setCommentsError(true);
      if (commentToDelete) {
        setComments(prev => [...prev, commentToDelete]);
      }
    });
  };

  useEffect(() => {
    setLoadingUsers(true);
    getUsers()
      .then(setUsers)
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUserId === null) {
      setPosts([]);
      setPostsError(false);

      return;
    }

    setLoadingPosts(true);
    setPostsError(false);

    getPosts(selectedUserId)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPost === null) {
      setComments([]);
      setCommentsError(false);

      return;
    }

    setLoadingComments(true);
    setCommentsError(false);

    getComments(selectedPost)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setLoadingComments(false));
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
                  setSelectedUserId={handleUserSelect}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!loadingUsers && selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {loadingPosts && <Loader />}
                {postsError && !loadingPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {/* eslint-disable */}
                {!loadingPosts &&
                  selectedUserId !== null &&
                  posts.length === 0 &&
                  !postsError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {!loadingPosts && posts.length > 0 && !postsError && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    isOpenDetails={isOpenDetails}
                    setIsOpenDetails={setIsOpenDetails}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  handleDeleteComment={handleDeleteComment}
                  handleAddComment={handleAddComment}
                  comments={comments}
                  posts={posts}
                  postId={selectedPost}
                  error={commentsError}
                  loadingComments={loadingComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
