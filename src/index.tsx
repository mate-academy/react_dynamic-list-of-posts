import ReactDOM from 'react-dom';
import { App } from './App';
import { AppContextProvider } from './components/AppContext';

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root'),
);
