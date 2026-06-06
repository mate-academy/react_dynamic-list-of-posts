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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [postsState, setPostsState] = useState({
    items: [] as Post[],
    isLoading: false,
    hasError: false,
  });

  const onSelectUser = (user: User) => {
    setSelectedUser(user);
    closeSidebar();
    clearSelectedPost();
  };

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(data => {
        setUsers(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPostsState({
      items: [],
      isLoading: true,
      hasError: false,
    });

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(data => {
        setPostsState({
          items: data,
          isLoading: false,
          hasError: false,
        });
      })
      .catch(() => {
        setPostsState(prevState => ({
          ...prevState,
          isLoading: false,
          hasError: true,
        }));
      });
  }, [selectedUser]);

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
          {postsState.isLoading && <Loader />}

          {!postsState.isLoading && postsState.hasError && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {!postsState.isLoading && !postsState.hasError && !selectedUser && (
            <p data-cy="NoSelectedUser">No user selected</p>
          )}

          {!postsState.isLoading &&
            !postsState.hasError &&
            selectedUser &&
            (postsState.items.length === 0 ? (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            ) : (
              <PostsList
                openSidebar={openSidebar}
                closeSidebar={closeSidebar}
                posts={postsState.items}
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
