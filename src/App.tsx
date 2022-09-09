import { Main } from './components/Main/Main';
import { Sidebar } from './components/Sidebar/Sidebar';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <Main />
          <Sidebar />
        </div>
      </div>
    </main>
  );
};
