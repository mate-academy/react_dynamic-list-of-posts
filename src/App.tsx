import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

// Types
import type { Post } from './types/Post';
import type { User } from './types/User';
import type { Comment } from './types/Comment';
import { UserErrors } from './types/User';

// Hooks
import React, { useState, useEffect } from 'react';

// API
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  // Load users
  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(serverUsers => {
        setUsers(serverUsers);
      })
      .catch(() => {
        // console.error('Failed to load users');
      });
  }, []);

  // Load posts after selecting a user
  useEffect(() => {
    if (selectedUser === null) {
      setPosts(null);
      setSelectedPost(null);

      return;
    }

    setPosts(null);
    setSelectedPost(null);
    setPostsError(false);
    setIsLoadingPosts(true);

    client
      .get<Post[]>(`/posts?userId=${selectedUser}`)
      .then(serverPosts => {
        setPosts(serverPosts);
      })
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, [selectedUser]);

  // Load comments

  useEffect(() => {
    const postId = selectedPost?.id ?? null;

    if (postId === null) {
      setComments(null);
      setCommentsError(false);
      setIsLoadingComments(false);

      return;
    }

    setComments(null);
    setCommentsError(false);
    setIsLoadingComments(true);

    client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(serverComments => {
        setComments(serverComments);
      })
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [selectedPost?.id]);

  // Delete comment

  const handleDeleteComment = (commentId: number) => {
    setComments(
      currentComments =>
        currentComments?.filter(comment => comment.id !== commentId) ?? null,
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      // console.error('Failed to delete comment');
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(currentComments =>
      currentComments ? [...currentComments, newComment] : [newComment],
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
                  users={users}
                  selected={selectedUser}
                  selectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">{UserErrors.noSelected}</p>
                )}

                {isLoadingPosts && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {UserErrors.wentWrong}
                  </div>
                )}

                {!isLoadingPosts && posts !== null && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {UserErrors.noPost}
                  </div>
                )}

                {!isLoadingPosts && posts !== null && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost !== null && (
            <div
              data-cy="Sidebar"
              className={cn(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsError={commentsError}
                  onDeleteComment={handleDeleteComment}
                  onAddComment={handleAddComment}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
