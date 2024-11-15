import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './context/PostContext';
import { Posts } from './components/Posts/Posts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundry';

export const App = () => {
  return (
    <PostsProvider>
      <ErrorBoundary>
        <Posts />
      </ErrorBoundary>
    </PostsProvider>
  );
};
