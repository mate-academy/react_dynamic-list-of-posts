import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  onChangePostId: (postId: number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, onChangePostId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onChangePostId(post.id)}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
