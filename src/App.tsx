import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';
import classNames from 'classnames';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorPosts, setErrorPosts] = useState<unknown | string>('');
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleUserChange = (user: User) => {
    setSelectedPost(null);
    setSelectedUser(user);
  };

  const handlePostChange = (post: Post | null) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    setErrorPosts('');
    
    async function loadPosts(url: string) {
      try {
        setLoadingPosts(true);
        const res: Post[] = await client.get(url);

        setPosts(res);
      } catch (e) {
        setErrorPosts(e);
      } finally {
        setLoadingPosts(false);
      }
    }

    if (selectedUser) {
      loadPosts(`/posts?userId=${selectedUser?.id}`);
    }
  }, [selectedUser]);

  const checkPosts = () => {
    let content;

    if (loadingPosts) {
      content = <Loader />;
    } else if (errorPosts) {
      content = (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    } else if (posts.length === 0) {
      content = (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    } else {
      content = <PostsList posts={posts} onChange={handlePostChange} />;
    }

    return content;
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onChange={handleUserChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && checkPosts()}
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
              selectedPost !== null && 'Sidebar--open',
            )}
          >
            {selectedPost !== null && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
