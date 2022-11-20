import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments } from './api/comments';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadUsersFromServer = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      throw new Error('Unable to load users from server');
    }
  };

  useEffect(() => {
    loadUsersFromServer();
  }, []);

  const loadPostsFromServer = async () => {
    if (!author) {
      return;
    }

    if (!selectedPost) {
      setIsLoadingPosts(true);
    }

    try {
      const postsFromServer = await getPosts(author.id);

      setPosts(postsFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      loadPostsFromServer();
    } else {
      setPosts([]);
    }
  }, [author?.id]);

  const loadComments = async () => {
    setIsLoadingComments(true);

    try {
      if (selectedPost) {
        const commentsFromServer = await getComments(selectedPost.id);

        setComments(commentsFromServer);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    setComments([]);
    loadComments();
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  user={author}
                  users={users}
                  chooseUser={setAuthor}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoadingPosts && <Loader />}

                {author && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoadingPosts && !hasError && (
                  posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      selectPost={setSelectedPost}
                    />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoading={isLoadingComments}
                  hasError={hasError}
                  setComments={setComments}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
