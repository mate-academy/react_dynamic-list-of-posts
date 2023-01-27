import {
  FC,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { Comment } from '../types/Comment';
import { PostsContext } from './PostsContext';
import * as commentsService from '../api/comments';

type Currently = 'noPost' | 'loading' | 'noComments' | 'serverError' | 'active';

type ContextProps = {
  currently: Currently;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const CommentsContext = createContext<ContextProps>({
  currently: 'noPost',
  comments: [],
  setComments: () => {},
});

type Props = {
  children: ReactNode;
};

export const CommentsProvider: FC<Props> = ({ children }) => {
  const { post } = useContext(PostsContext);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currently, setCurrently] = useState<Currently>('noPost');
  const [requestCount, setRequestCount] = useState(0);

  const getPosts = useCallback(
    () => {
      setCurrently('loading');
      if (post) {
        setRequestCount(prev => prev + 1);
        commentsService.getAllByPost(post.id)
          .then(result => {
            setComments(result);
            setCurrently(result.length ? 'active' : 'noComments');
          })
          .catch(() => {
            setCurrently('serverError');
          });
      } else {
        setCurrently('noPost');
      }
    },
    [post],
  );

  useEffect(() => {
    getPosts();
  }, [post]);

  useEffect(() => {
    if (requestCount < 3) {
      if (currently === 'serverError') {
        setTimeout(() => {
          setCurrently('loading');
          getPosts();
        }, 1000);
      }
    }
  }, [requestCount]);

  return (
    <CommentsContext.Provider value={{
      currently: currently as Currently,
      comments,
      setComments,
    }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
