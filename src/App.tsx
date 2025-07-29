/* eslint-disable prettier/prettier */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getPosts } from './api/posts';
import { Loader } from './components/Loader';
import { getComments } from './api/comments';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isUsersError, setIsUsersError] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);

  function loadUsers() {
    setIsUsersError(false);

    getUsers()
      .then(setUsers)
      .catch(() => setIsUsersError(true));
  }

  const loadPostsByUser = (userId: number) => {
    setIsPostsError(false);
    setIsLoadingPosts(true);

    getPosts(userId)
      .then(setPosts)
      .catch(() => setIsPostsError(true))
      .finally(() => {
        setIsLoadingPosts(false);
      });
  };

  const loadCommentsByPost = (postId: number) => {
    setIsCommentsError(false);
    setIsLoadingComments(true);

    getComments(postId)
      .then(allComments => {
        const postComments = allComments.filter(
          comment => comment.postId === postId,
        );

        setComments(postComments);
      })
      .catch(() => setIsCommentsError(true))
      .finally(() => {
        setIsLoadingComments(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      return;
    }

    setSelectedPostId(null);
    loadPostsByUser(selectedUserId);
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId !== null) {
      loadCommentsByPost(selectedPostId);
    }
  }, [selectedPostId]);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div
            className={classNames(
              'tile',
              'is-parent',
              selectedPostId ? 'is-4-desktop' : 'is-12',
            )}
          >
            <div className="tile is-child box is-success">
              {!isUsersError && (
                <div className="block">
                  <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onSelect={setSelectedUserId}
                  />
                </div>
              )}

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {!isLoadingPosts && !isPostsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedUserId={selectedUserId}
                    selectedPostId={selectedPostId}
                    onPostSelect={setSelectedPostId}
                  />
                )}

                {(isPostsError || isUsersError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!isLoadingPosts &&
                  !isPostsError &&
                  selectedUserId &&
                  posts.length === 0 && (
                // eslint-disable-next-line prettier/prettier
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                      No posts yet
                  </div>
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            {selectedPostId && (
              <div className="tile is-child box is-success">
                <PostDetails
                  selectedPost={selectedPost}
                  commentsByPost={comments}
                  isLoading={isLoadingComments}
                  isLoadError={isCommentsError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
