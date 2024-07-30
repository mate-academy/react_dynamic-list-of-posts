import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  ActiveUserProvider,
  ErrorsProvider,
  LoaderProvider,
  PostsProvider,
  ActivePostProvider,
  CommentListProvider,
  CommentFormProvider,
} from './utils/Store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CommentListProvider>
    <ActivePostProvider>
      <PostsProvider>
        <LoaderProvider>
          <ActiveUserProvider>
            <ErrorsProvider>
              <CommentFormProvider>
                <App />
              </CommentFormProvider>
            </ErrorsProvider>
          </ActiveUserProvider>
        </LoaderProvider>
      </PostsProvider>
    </ActivePostProvider>
  </CommentListProvider>,
);
