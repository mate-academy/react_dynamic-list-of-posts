import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

interface UseLoadingStateParams {
  loading: boolean,
  errorMessage: string,
  selectedItem: User | Post | null,
  list: Post[] | Comment[],
}

export function useLoadingState({
  loading,
  errorMessage,
  selectedItem,
  list,
}: UseLoadingStateParams) {
  const hasError = !loading && errorMessage;
  const hasNoList = !loading
    && !errorMessage && selectedItem && list.length === 0;
  const shouldRenderItems = !loading
    && !errorMessage && selectedItem && list.length > 0;

  return {
    hasError,
    hasNoList,
    shouldRenderItems,
  };
}
