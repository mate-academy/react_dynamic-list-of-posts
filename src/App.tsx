import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostProvider } from './contexts/PostContext';

import { PostContent } from './components/PostContent';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = () => (
  <PostProvider>
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <PostContent />
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  </PostProvider>
);
