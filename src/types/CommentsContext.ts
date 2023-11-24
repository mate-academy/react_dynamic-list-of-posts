import { Comment } from './Comment';

export interface CommentsContext {
  comments: Comment[],
  setComments: (v: Comment[]) => void;
  isLoadingComments: boolean;
  setIsLoadingComments: (v: boolean) => void;
  hasCommentsError: boolean;
  setHasCommentsError: (v: boolean) => void;
  submitNewComment: (v: Omit<Comment, 'id'>) => void;
  isSubmittingComment: boolean;
  setisSubmittingComment: (v: boolean) => void;
  deleteComment: (v: number) => void;
  isOpenNewCommentForm: boolean,
  setIsOpenNewCommentForm: (v: boolean) => void;

}
