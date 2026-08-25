import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import {
  getUsers,
  getUserPosts,
  getPostComments,
  deleteComment,
} from './utils/api';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsPostsLoading(true);
    setPostsError(false);

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setIsPostsLoading(false));
  }, [selectedUser]);

  const handlePostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setIsWritingComment(false);
    setComments([]);
    setIsCommentsLoading(true);
    setCommentsError(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  };

  const handleCommentAdd = (comment: Comment) => {
    setComments(current => [...current, comment]);
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(current => current.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {});
  };

  const hasPosts = !isPostsLoading && !postsError && posts.length > 0;
  const hasNoPosts = !isPostsLoading && !postsError && posts.length === 0;

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
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isPostsLoading && <Loader />}

                {selectedUser && !isPostsLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && hasPosts && (
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isCommentsLoading={isCommentsLoading}
                  commentsError={commentsError}
                  isWritingComment={isWritingComment}
                  onWriteCommentClick={() => setIsWritingComment(true)}
                  onCommentAdd={handleCommentAdd}
                  onCommentDelete={handleCommentDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
