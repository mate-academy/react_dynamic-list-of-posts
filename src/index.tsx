import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from 'store';
import { App } from 'app/App';

import './index.scss';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import { SnackbarProvider } from 'notistack';
import Notifications from 'components/Notifications';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <App />
        <Notifications />
      </SnackbarProvider>
    </Router>
  </Provider>,
);
