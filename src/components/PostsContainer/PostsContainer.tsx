// ..PostsContainer

import { useState, useEffect } from 'react';
import { UserSelector } from './UserSelector';
import { Loader } from '../Loader';
import { PostsList } from './PostsList';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

interface PostsContainerProps {
  openSidebar: () => void;
  handleSelectedPost: (post: Post) => void;
  selectedPost: Post | null;
  clearSelectedPost: () => void;
  closeSidebar: () => void;
}

export const PostsContainer = ({
  openSidebar,
  handleSelectedPost,
  selectedPost,
  clearSelectedPost,
  closeSidebar,
}: PostsContainerProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [noPostsYetMessage, setNoPostsYetMessage] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const onSelectUser = (user: User) => {
    setSelectedUser(user);
    closeSidebar();
    clearSelectedPost();
  };

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsPostsLoading(true);
    setPosts([]);
    setPostsLoadingError(false);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(data => {
        setPosts(data);
        setNoPostsYetMessage(data.length === 0);
      })
      .catch(() => {
        setPostsLoadingError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        setPostsLoadingError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
        setNoPostsYetMessage(false);
      });
  }, []);

  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <div className="block">
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onSelectUser={onSelectUser}
          />
        </div>

        <div className="block" data-cy="MainContent">
          {isPostsLoading && <Loader />}

          {!isPostsLoading && postsLoadingError && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {!isPostsLoading && !postsLoadingError && !selectedUser && (
            <p data-cy="NoSelectedUser">No user selected</p>
          )}

          {!isPostsLoading &&
            !postsLoadingError &&
            selectedUser &&
            (noPostsYetMessage ? (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            ) : (
              <PostsList
                openSidebar={openSidebar}
                closeSidebar={closeSidebar}
                posts={posts}
                handleSelectedPost={handleSelectedPost}
                selectedPost={selectedPost}
                clearSelectedPost={clearSelectedPost}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
