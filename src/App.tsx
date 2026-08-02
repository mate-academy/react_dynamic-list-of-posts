import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[]>(
    [],
  );
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(false);
  const [isPostCommentsLoading, setIsPostCommentsLoading] = useState(false);
  const [isWriteCommentFormOpen, setIsWriteCommentFormOpen] = useState(false);
  const [errors, setErrors] = useState({
    userPosts: false,
    postComments: false,
  });

  // fetch the users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await client.get<User[]>('/users');

      setUsers(usersResponse);
    };

    fetchUsers();
  }, []);

  // fetch posts of the selected user
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!selectedUser) {
        return;
      }

      try {
        setErrors(currentErrors => ({ ...currentErrors, userPosts: false }));
        setIsUserPostsLoading(true);

        const postsResponse = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setUserPosts(postsResponse);
      } catch {
        setErrors(currentErrors => ({ ...currentErrors, userPosts: true }));
      } finally {
        setIsUserPostsLoading(false);
      }
    };

    fetchUserPosts();
  }, [selectedUser]);

  // fetch comments for the selected post
  useEffect(() => {
    if (!selectedPost) {
      setSelectedPostComments([]);

      return;
    }

    const fetchPostComments = async () => {
      try {
        setErrors(currentErrors => ({ ...currentErrors, postComments: false }));
        setIsPostCommentsLoading(true);

        const commentsResponse = await client.get<Comment[]>(
          `/comments?postId=${selectedPost?.id}`,
        );

        setSelectedPostComments(commentsResponse);
      } catch {
        setErrors(currentErrors => ({ ...currentErrors, postComments: true }));
      } finally {
        setIsPostCommentsLoading(false);
      }
    };

    fetchPostComments();
  }, [selectedPost]);

  useEffect(() => {
    setSelectedPost(null);
    setSelectedPostComments([]);
  }, [selectedUser]);

  useEffect(() => {
    setIsWriteCommentFormOpen(false);
  }, [selectedPost]);

  const handleAddCommentError = () => {
    setErrors(currentErrors => ({ ...currentErrors, postComments: true }));
  };

  const handleAddComment = (comment: Comment) => {
    setSelectedPostComments(currentComments => [...currentComments, comment]);
  };

  const handleCommentDelete = (commentId: number) => {
    setSelectedPostComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
  };

  const isNoPostsAvailable =
    !errors.userPosts &&
    !isUserPostsLoading &&
    selectedUser &&
    userPosts.length === 0;

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

                {isUserPostsLoading && <Loader />}

                {errors.userPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsAvailable ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : null}

                {!isUserPostsLoading && userPosts.length > 0 ? (
                  <PostsList
                    posts={userPosts}
                    selectedPostId={selectedPost?.id}
                    onPostSelect={setSelectedPost}
                  />
                ) : null}
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
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                isPostCommentsLoading={isPostCommentsLoading}
                selectedPostComments={selectedPostComments}
                hasPostCommentsError={errors.postComments}
                isWriteCommentFormOpen={isWriteCommentFormOpen}
                onWriteCommentFormOpen={setIsWriteCommentFormOpen}
                onAddCommentError={handleAddCommentError}
                onAddComment={handleAddComment}
                onCommentDelete={handleCommentDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
