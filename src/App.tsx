import { useContext } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Sidebar } from './components/common';
import { StateContext } from './store';
import { UserPosts } from './components/UserPosts';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const {
    posts: { selectedPost },
  } = useContext(StateContext);

  const isShowPostDetails = !!selectedPost;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <UserPosts />

          <Sidebar>
            {isShowPostDetails && (
              <PostDetails />
            )}
          </Sidebar>
        </div>
      </div>
    </main>
  );
};
