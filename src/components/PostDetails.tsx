import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comments } from './Comments';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);

  const openCommentForm = () => {
    setIsCommentFormOpen(true);
  };

  const setPostingState = useCallback((isPosting: boolean) => {
    setIsPostingComment(isPosting);
  }, [isPostingComment]);

  useEffect(() => {
    setIsCommentFormOpen(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <Comments
          postId={selectedPost.id}
          onNewComment={openCommentForm}
          isPostingComment={isPostingComment}
        />

        {isCommentFormOpen && (
          <NewCommentForm
            postId={selectedPost.id}
            onCommentPost={setPostingState}
            isPostingComment={isPostingComment}
          />
        )}
      </div>
    </div>
  );
};
