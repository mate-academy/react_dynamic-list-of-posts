import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const hasNoPosts =
    selectedUser !== null && !postsLoading && !postsError && posts.length === 0;

  const hasPosts =
    selectedUser !== null && !postsLoading && !postsError && posts.length > 0;

  function handleUserSelect(user: User) {
    setSelectedUser(user);
    setSelectedPost(null);
  }

  function loadUsers() {
    client.get<User[]>('/users').then(loadedUsers => {
      setUsers(loadedUsers);
    });
  }

  useEffect(loadUsers, []);

  useEffect(() => {
    let isActive = true;

    if (selectedUser !== null) {
      setPostsLoading(true);
      setPostsError(false);

      client
        .get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(loadedPosts => {
          if (isActive) {
            setPosts(loadedPosts);
          }
        })
        .catch(() => {
          if (isActive) {
            setPostsError(true);
          }
        })
        .finally(() => {
          if (isActive) {
            setPostsLoading(false);
          }
        });
    }

    return () => {
      isActive = false;
    };
  }, [selectedUser]);

  useEffect(() => {
    let isActive = true;

    if (selectedPost !== null) {
      setComments([]);
      setCommentsLoading(true);
      setCommentsError(false);

      client
        .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
        .then(loadedComments => {
          if (isActive) {
            setComments(loadedComments);
          }
        })
        .catch(() => {
          if (isActive) {
            setCommentsError(true);
          }
        })
        .finally(() => {
          if (isActive) {
            setCommentsLoading(false);
          }
        });
    }

    return () => {
      isActive = false;
    };
  }, [selectedPost]);

  function handleAddComment(newComment: Comment) {
    setComments(currentComments => [...currentComments, newComment]);
  }

  function handleDeleteComment(commentId: number) {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`);
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && (
                  <PostsList
                    posts={posts}
                    onPostSelect={setSelectedPost}
                    selectedPost={selectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost !== null,
            })}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                selectedPost={selectedPost}
                comments={comments}
                commentsLoading={commentsLoading}
                commentsError={commentsError}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
