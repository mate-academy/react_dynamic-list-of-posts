import React from 'react';
import './PostsList.scss';
import { Posts } from '../../types/types';
import { PostsInfo } from '../PostsInfo/PostsInfo';

interface Props {
  visiblePosts: Posts[]
  selectedPost: (postId: number) => void
  selectedPostId: number
}

export const PostsList: React.FC<Props>
  = ({ visiblePosts, selectedPost, selectedPostId }) => (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {visiblePosts.map(post => (
          <PostsInfo
            post={post}
            key={post.id}
            selectedPost={selectedPost}
            selectedPostId={selectedPostId}
          />
        ))}
      </ul>
    </div>
  );
