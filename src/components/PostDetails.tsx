import React from 'react';
import { Post } from '../types/Post';
import { Comments } from './Comments';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <Comments selectedPost={selectedPost} />
      </div>
    </div>
  );
};
