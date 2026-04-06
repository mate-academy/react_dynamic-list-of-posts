import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client.get('/users').then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setSelectedPost(null);
    setIsLoadingPosts(true);
    setPostsError(false);
    setPosts([]);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUserId]);

  let content;

  if (!selectedUserId) {
    content = <p data-cy="NoSelectedUser">No user selected</p>;
  } else if (isLoadingPosts) {
    content = <Loader />;
  } else if (postsError) {
    content = (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  } else if (selectedUserId && posts.length === 0) {
    content = (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  } else {
    content = (
      <PostsList
        posts={posts}
        selectedPostId={selectedPost?.id}
        onSelectPost={setSelectedPost}
      />
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onChange={setSelectedUserId}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {content}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
