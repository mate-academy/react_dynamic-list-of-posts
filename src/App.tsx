import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  // Загружаем пользователей при открытии приложения
  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => {
        setUsers([]);
      });
  }, []);

  // Загружаем посты выбранного пользователя
  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    let cancelled = false;

    setPostsLoading(true);
    setPostsError(false);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(result => {
        if (!cancelled) {
          setPosts(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPostsError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPostsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedUser]);

  // Загружаем комментарии выбранного поста
  useEffect(() => {
    if (!selectedPost) {
      setComments([]);

      return;
    }

    let cancelled = false;

    setComments([]);
    setCommentsLoading(true);
    setCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(result => {
        if (!cancelled) {
          setComments(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCommentsError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setCommentsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedPost]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setPosts([]);
    setComments([]);
    setPostsError(false);
  };

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  const handleAddComment = async (data: CommentData) => {
    if (!selectedPost) {
      return;
    }

    const newComment = await client.post<Comment>('/comments', {
      ...data,
      postId: selectedPost.id,
    });

    setComments(current => [...current, newComment]);
  };

  const handleDeleteComment = async (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);

    if (!deletedComment) {
      return;
    }

    // Сразу убираем комментарий со страницы
    setComments(current => current.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      // Если сервер вернул ошибку, возвращаем комментарий
      setComments(current => [...current, deletedComment]);
    }
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
                  onSelect={handleSelectUser}
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

                {selectedUser &&
                  !postsLoading &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !postsLoading &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelect={handleSelectPost}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
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
