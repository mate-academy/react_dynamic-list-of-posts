import { AppPosts } from './AppPosts';
import { GlobalProvider } from './GlobalContetxt';

export const App = () => (
  <GlobalProvider>
    <AppPosts />
  </GlobalProvider>
);
