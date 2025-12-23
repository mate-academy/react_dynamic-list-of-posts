import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postError, setPostError] = useState(false);
  const [сommentError, setCommentError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPostsLoading, setIsPostLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isNewCommentOpen, setIsNewCommentOpen] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const loadPosts = async () => {
      try {
        setPosts([]);
        setSelectedPost(null);
        setComments([]);
        setIsNewCommentOpen(false);
        setPostError(false);

        setIsPostLoading(true);

        const gettedPosts = await getPosts(userId);

        setPosts(gettedPosts);
      } catch {
        setPostError(true);
      } finally {
        setIsPostLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setComments([]);
    setIsNewCommentOpen(false);
    setIsCommentLoading(true);

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setCommentError(true))
      .finally(() => setIsCommentLoading(false));
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setUserId={setUserId}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                  users={users}
                  userId={userId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && <p data-cy="NoSelectedUser">No user selected</p>}

                {isPostsLoading && <Loader />}

                {postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userId &&
                  !postError &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      setSelectedPost={setSelectedPost}
                      selectedPost={selectedPost}
                      setIsNewCommentOpen={setIsNewCommentOpen}
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
              { 'Sidebar--open': selectedPost && selectedPost?.id > 0 },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                setIsNewCommentOpen={setIsNewCommentOpen}
                setComments={setComments}
                isNewCommentOpen={isNewCommentOpen}
                selectedPost={selectedPost}
                isCommentLoading={isCommentLoading}
                comments={comments}
                сommentError={сommentError}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
