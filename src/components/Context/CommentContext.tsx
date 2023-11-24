import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { Comment } from '../../types/Comment';
import { CommentsContext } from '../../types/CommentsContext';
import * as commentService from '../../api/comments';
import { PostContext } from './PostContext';

const initialState = {
  comments: [],
  setComments: () => {},
  isLoadingComments: false,
  setIsLoadingComments: () => {},
  hasCommentsError: false,
  setHasCommentsError: () => {},
  submitNewComment: () => {},
  isSubmittingComment: false,
  setisSubmittingComment: () => {},
  deleteComment: () => {},
  isOpenNewCommentForm: false,
  setIsOpenNewCommentForm: () => {},
};

export const CommentContext
  = React.createContext<CommentsContext>(initialState);

type Props = {
  children: React.ReactNode;
};

export const CommentProvider: React.FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isSubmittingComment, setisSubmittingComment] = useState(false);
  const [isOpenNewCommentForm, setIsOpenNewCommentForm] = useState(false);

  const { selectedPost } = useContext(PostContext);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      commentService.getComments(selectedPost.id)
        .then(commentsData => setComments(commentsData))
        .catch(() => setHasCommentsError(true))
        .finally(() => setIsLoadingComments(false));
    }
  },
  [selectedPost]);

  const submitNewComment = ({
    postId, name, email, body,
  }: Omit<Comment, 'id'>) => {
    setisSubmittingComment(true);

    commentService.postComment({
      postId, name, email, body,
    })
      .then(comment => setComments(prevComments => [...prevComments, comment]))
      .finally(() => setisSubmittingComment(false));
  };

  const deleteComment = (commentId: number) => {
    setComments(currentComments => currentComments
      .filter(comment => comment.id !== commentId));

    commentService.deleteComment(commentId)
      .catch(() => setComments(comments));
  };

  const value = {
    comments,
    setComments,
    isLoadingComments,
    setIsLoadingComments,
    hasCommentsError,
    setHasCommentsError,
    submitNewComment,
    isSubmittingComment,
    setisSubmittingComment,
    deleteComment,
    isOpenNewCommentForm,
    setIsOpenNewCommentForm,
  };

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>

  );
};
