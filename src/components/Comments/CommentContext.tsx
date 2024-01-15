import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Comment } from '../../types/Comment';
import { PostsContext } from '../Posts/PostContext';
import { PostCommentsType } from '../../types/PostCommentsType';
import * as data from '../../api/data';

export interface CommentsContextType {
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  formIsLoading: boolean,
  setFormIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CommentsContext = React.createContext<CommentsContextType>({
  comments: [],
  setComments: () => { },
  formIsLoading: false,
  setFormIsLoading: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const { selectedPost, setDetails } = useContext(PostsContext);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setDetails(PostCommentsType.IsLoading);

    data.getComments(selectedPost.id)
      .then(currentComments => setComments(currentComments))
      .catch(() => setDetails(PostCommentsType.CommentsError));
  }, [selectedPost, setDetails]);

  useEffect(() => {
    if (comments.length === 0) {
      setDetails(PostCommentsType.NoCommentsMessage);
    } else {
      setDetails(PostCommentsType.CommentsList);
    }
  }, [comments, setDetails]);

  const value = useMemo(() => ({
    comments,
    setComments,
    formIsLoading,
    setFormIsLoading,
  }), [comments, formIsLoading]);

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
