import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postId, setPostId] = useState<number>();

  const handleUserSelect = (id: number) => {
    setSelectedUser(id);
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setPostId(post.id);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onUserSelect={handleUserSelect} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && (
                  <PostsList userId={selectedUser} onOpen={handlePostSelect} />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={selectedPost} postId={postId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
