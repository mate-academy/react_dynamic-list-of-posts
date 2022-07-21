import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/post';

type Props = {
  posts: Post[],
  selectedPostId: number,
  handleSelectedPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  handleSelectedPostId,
}) => {
  const onPostIdChange = (postId: number) => {
    if (selectedPostId !== postId) {
      handleSelectedPostId(postId);
    } else {
      handleSelectedPostId(0);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul data-cy="postDetails" className="PostsList__list">
        {posts?.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostIdChange(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
});
