import React from 'react';
import { usePost } from '../hooks/usePost';
import PostDetailsComments from './PostDetailsComments';

export const PostDetails: React.FC = () => {
  const { selectedPost } = usePost();

  return (
    <div className="content" data-cy="PostDetails">
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
          <PostDetailsComments />
        </div>
      </div>
    </div>
  );
};
