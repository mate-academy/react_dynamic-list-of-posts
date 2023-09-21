import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { useComments } from './Contexts/CommentsContext';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { PostDetails } from './PostDetails';

type Props = {
  selectedPost: Post,
  isNewComment: boolean,
  onAddComment: (status: boolean) => void,
};

export const PostDetailsSidebar: React.FC<Props> = ({
  selectedPost,
  isNewComment,
  onAddComment,
}) => {
  const { comments, setComments } = useComments();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (selectedPost) {
      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  return (
    <>
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <PostDetails
              comments={comments}
              isNewComment={isNewComment}
              onAddComment={onAddComment}
              onDeleteComment={deleteComment}
              hasError={hasError}
              selectedPost={selectedPost}
            />
          )}
        </div>
      </div>
    </>
  );
};
