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
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [writingComment, setWritingComment] = useState(false);

  const getMainContent = () => {
    if (!selectedUser) {
      return (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      );
    }

    if (loadingPosts) {
      return <Loader />;
    }

    if (postsError) {
      return (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      );
    }

    if (!posts?.length) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={posts}
        selectedPost={selectedPost}
        setPost={post => {
          setWritingComment(false);
          setSelectedPost(post);
        }}
      />
    );
  };

  const loadComments = () => {
    if (!selectedPost) {
      return;
    }

    setLoadingComments(true);

    client.get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(response => setComments(response))
      .catch(() => setCommentsError(true))
      .finally(() => setLoadingComments(false));
  };

  useEffect(() => {
    client.get<User[]>('/users').then(response => setUsers(response));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setLoadingPosts(true);

    client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(response => setPosts(response))
      .catch(() => setPostsError(true))
      .finally(() => setLoadingPosts(false));
  }, [selectedUser]);

  useEffect(loadComments, [selectedPost]);

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
                  setUser={(user) => {
                    setWritingComment(false);
                    setSelectedPost(undefined);
                    setPostsError(false);
                    setSelectedUser(user);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {getMainContent()}
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
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  setComments={setComments}
                  loadingComments={loadingComments}
                  commentsError={commentsError}
                  writing={writingComment}
                  setWriting={setWritingComment}
                  loadComments={loadComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
