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
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoadingPosts(true);
    setPostsError(false);
    setPosts([]);
    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      setComments([]);

      return;
    }

    setLoadingComments(true);
    setCommentsError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setLoadingComments(false));
  }, [selectedPost]);

  const handlePostSelect = (post: Post) => {
    setSelectedPost(currentPost => (currentPost?.id === post.id ? null : post));
  };

  const handleAddComment = (comment: Comment) => {
    setComments(currentComments => [...currentComments, comment]);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
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
                  selectedUser={selectedUser}
                  onUserSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {/* eslint-disable @typescript-eslint/indent */}
                {!loadingPosts &&
                  selectedUser &&
                  posts.length === 0 &&
                  !postsError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-enable @typescript-eslint/indent */}

                {!loadingPosts && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelect={handlePostSelect}
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
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  loadingComments={loadingComments}
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
