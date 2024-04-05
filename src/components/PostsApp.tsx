import { UserSelector } from '../components/UserSelector';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

export const PostsApp = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <UserSelector />
              <MainContent />
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
