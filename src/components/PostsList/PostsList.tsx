import React from 'react';
import { PostRenderer } from '../PostRenderer';
import './PostsList.scss';

interface Props {
  posts: Post[],
  setSelectedPostId: React.Dispatch<React.SetStateAction<number>>,
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({ posts, setSelectedPostId, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          post && (
            <li key={post.id} className="PostsList__item">
              <PostRenderer
                post={post}
                isSelected={post.id === selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            </li>
          )))}
      </ul>
    </div>
  );
};
