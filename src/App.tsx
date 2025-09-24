import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postsState, setPostsState] = useState({
    posts: [] as Post[],
    isLoading: false,
    error: false,
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsState, setCommentsState] = useState({
    comments: [] as Comment[],
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPostsState({
      posts: [],
      isLoading: true,
      error: false,
    });

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(posts => {
        setPostsState(prev => ({
          ...prev,
          posts,
          isLoading: false,
        }));
      })
      .catch(() => {
        setPostsState(prev => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
      });
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post === selectedPost ? null : post);
  };

  const loadComments = useCallback(() => {
    if (!selectedPost) {
      return;
    }

    setCommentsState({
      comments: [],
      isLoading: true,
      error: false,
    });

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(comments => {
        setCommentsState(prev => ({
          ...prev,
          comments,
          isLoading: false,
        }));
      })
      .catch(() => {
        setCommentsState(prev => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
      });
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      loadComments();
    }
  }, [selectedPost, loadComments]);

  const addComment = (newComment: Omit<Comment, 'id'>) => {
    return client
      .post<Comment>('/comments', newComment)
      .then(comment => {
        setCommentsState(prev => ({
          ...prev,
          comments: [...prev.comments, comment],
        }));

        return comment;
      })
      .catch(error => {
        throw error;
      });
  };

  const deleteComment = (commentId: number) => {
    const originalComments = commentsState.comments;

    setCommentsState(prev => ({
      ...prev,
      comments: prev.comments.filter(comment => comment.id !== commentId),
    }));

    client.delete(`/comments/${commentId}`).catch(() => {
      setCommentsState(prev => ({
        ...prev,
        comments: originalComments,
      }));
    });
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
                  onSelectUser={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsState.isLoading && <Loader />}

                {postsState.error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !postsState.isLoading &&
                  !postsState.error &&
                  (postsState.posts.length > 0 ? (
                    <PostsList
                      posts={postsState.posts}
                      onSelectPost={handlePostSelect}
                      selectedPost={selectedPost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={commentsState.comments}
                  loadComments={loadComments}
                  isCommentsLoading={commentsState.isLoading}
                  commentsLoadingError={commentsState.error}
                  deleteComment={deleteComment}
                  addComment={addComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
