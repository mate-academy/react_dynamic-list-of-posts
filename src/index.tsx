import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { UsersProvider } from './components/UsersContext';

const Root = () => (
  <UsersProvider>
    <Router>
      <App />
    </Router>
  </UsersProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
