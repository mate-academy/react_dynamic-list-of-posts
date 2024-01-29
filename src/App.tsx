import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { useContext, useState } from 'react';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { MainContent } from './components/MainContent/MainContent';
import { User } from './types/User';
import { MainContext } from './components/MainContext/MainContext';

export const App: React.FC = () => {
  const { choosedPost } = useContext(MainContext);
  const [choosedUser, setChoosedUser] = useState<User>();

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  choosedUser={choosedUser}
                  setChoosedUser={setChoosedUser}
                />
              </div>

              <MainContent
                choosedUser={choosedUser}
              />

            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': choosedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {choosedPost && (<PostDetails />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
