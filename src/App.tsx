import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import React from 'react';
import { UserSelector } from './components/Users/UserSelector';
import { MainContent } from './components/Posts/MainContent';
import { PostSlidebar } from './components/Posts/PostSlidebar';
import { MainProvider } from './components/MainContext';

export const App: React.FC = () => {
  return (
    <MainProvider>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector />
                </div>
                <MainContent />
              </div>
            </div>
            <PostSlidebar />
          </div>
        </div>
      </main>
    </MainProvider>
  );
};
