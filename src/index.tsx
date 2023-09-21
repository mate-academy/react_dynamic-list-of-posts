// import { createRoot } from 'react-dom/client';

// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// // import './styles/index.scss';
// import { AppContextProvider } from './components/AppContext';

// import { App } from './App';

// createRoot(document.getElementById('root') as HTMLDivElement)
//   .render(
//     <AppContextProvider>
//      <App />
//     </AppContextProvider>,
//   );


import ReactDOM from 'react-dom';

import { App } from './App';
import { AppContextProvider } from './components/AppContext';

ReactDOM.render(
  <AppContextProvider>
  <App />
  </AppContextProvider>,
  document.getElementById('root')
);
