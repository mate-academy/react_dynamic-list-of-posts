import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsContainer } from './components/PostsContainer/PostsContainer';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const clearSelectedPost = () => {
    setSelectedPost(null);
  };

  const openSidebar = () => {
    setIsSidebar(true);
  };

  const closeSidebar = () => {
    setIsSidebar(false);
  };

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <PostsContainer
            openSidebar={openSidebar}
            closeSidebar={closeSidebar}
            handleSelectedPost={handleSelectedPost}
            selectedPost={selectedPost}
            clearSelectedPost={clearSelectedPost}
          />

          {/* Передаємо стан прямо в Sidebar */}
          <Sidebar selectedPost={selectedPost} isSidebarOpen={isSidebar} />
        </div>
      </div>
    </main>
  );
};
