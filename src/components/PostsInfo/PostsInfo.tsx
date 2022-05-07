import React from 'react';
import { Posts } from '../../types/types';

interface Props {
  post: Posts
  selectedPost: (postId: number) => void
  selectedPostId: number
}

export const PostsInfo: React.FC<Props>
  = ({ post, selectedPost, selectedPostId }) => (
    <li className="PostsList__item">
      <div>
        <b>
          [User #
          {post.userId}
          ]:
          {' '}
        </b>
        {post.body}
      </div>
      {selectedPostId === post.id ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => selectedPost(-1)}
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => selectedPost(post.id)}
        >
          Open
        </button>
      )}
    </li>
  );
