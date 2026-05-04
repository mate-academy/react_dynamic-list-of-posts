import { useCallback, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Post } from './types/Post';

export const App = () => {
  const [expandedViewPost, setExpandedViewPost] = useState<Post | null>(null);

  const selectExpandedViewPost = useCallback((post: Post) => {
    setExpandedViewPost(post);
  }, []);

  const collapseExpandedViewPost = useCallback(() => {
    setExpandedViewPost(null);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <Main
            onClosePostDetails={collapseExpandedViewPost}
            onOpenPostDetails={selectExpandedViewPost}
            activePost={expandedViewPost}
          />
          <Sidebar activePost={expandedViewPost} />
        </div>
      </div>
    </main>
  );
};
