import React from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { PostDetailsItem } from './PostDetailsItem';
import { LoaderState } from '../types/LoaderState';
import { Comment } from '../types/Comment';

interface Props {
  comments: Comment[];
  loaderComment: LoaderState;
  errorMessageComment: string | null;
  onSubmit: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  selectedPost: Post | null;
  deleteComment: (commentId: number) => Promise<void>;
  isOpenComment: boolean;
  setIsOpenComment: (value: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  comments,
  loaderComment,
  errorMessageComment,
  onSubmit,
  selectedPost,
  deleteComment,
  isOpenComment,
  setIsOpenComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {selectedPost && (
          <PostDetailsItem
            selectedPost={selectedPost}
            comments={comments}
            loaderComment={loaderComment}
            errorMessageComment={errorMessageComment}
            isOpenComment={isOpenComment}
            setIsOpenComment={setIsOpenComment}
            deleteComment={deleteComment}
          />
        )}

        {isOpenComment && (
          <NewCommentForm onSubmit={onSubmit} selectedPost={selectedPost} />
        )}
      </div>
    </div>
  );
};
