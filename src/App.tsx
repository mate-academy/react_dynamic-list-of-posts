import { useEffect, useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { useFetch } from './hooks/useFetch';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const postsUrl = selectedUser ? `/posts?userId=${selectedUser.id}` : null;

  const {
    data: postsData,
    isLoading: isPostsLoading,
    hasError: postsError,
  } = useFetch<Post[]>(postsUrl);

  const posts = postsData ?? [];

  useEffect(() => {
    setSelectedPost(null);
  }, [selectedUser]);

  useEffect(() => {
    setIsFormVisible(false);

    if (!selectedPost) {
      setComments([]);

      return;
    }

    setIsCommentsLoading(true);
    setCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [selectedPost]);

  const handleAddComment = (data: CommentData) => {
    if (!selectedPost) {
      return Promise.resolve();
    }

    return client
      .post<Comment>('/comments', { ...data, postId: selectedPost.id })
      .then(newComment => {
        setComments(prev => [...prev, newComment]);
      });
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));

    // The comment is already removed (optimistic update),
    // so a failed delete request is intentionally ignored.
    client.delete(`/comments/${commentId}`).catch(() => {});
  };

  const showLoader = selectedUser && isPostsLoading;
  const hasPostsError = selectedUser && postsError;
  const hasNoPosts =
    selectedUser && !isPostsLoading && !postsError && posts.length === 0;
  const hasPosts =
    selectedUser && !isPostsLoading && !postsError && posts.length > 0;

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
                  onSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showLoader && <Loader />}

                {hasPostsError && (
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
                    selectedPost={selectedPost}
                    onOpen={setSelectedPost}
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
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments}
                isLoading={isCommentsLoading}
                hasError={commentsError}
                isFormVisible={isFormVisible}
                onShowForm={() => setIsFormVisible(true)}
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
