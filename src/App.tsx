import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { request } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [writingComment, setWritingComment] = useState(false);

  useEffect(() => {
    request<User[]>('/users').then(response => setUsers(response));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPost(null);
    setPostsError(false);

    request<Post[]>(`/posts?userId=${selectedUser?.id}`)
      .then(response => setPosts(response))
      .catch(() => setPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    request<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(response => setComments(response))
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  users={users}
                  setLoading={setLoadingPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) : (
                  <>
                    {loadingPosts ? <Loader /> : (
                      <>
                        {postsError && (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )}

                        {posts.length === 0 ? (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        ) : (
                          <PostsList
                            posts={posts}
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                            setLoading={setLoadingComments}
                            setWritingComment={setWritingComment}
                          />
                        )}
                      </>
                    )}
                  </>
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
              <PostDetails
                post={selectedPost}
                comments={comments}
                setComments={setComments}
                error={commentsError}
                loading={loadingComments}
                writingComment={writingComment}
                setWritingComment={setWritingComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
