import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  postId: number,
  handleSelectedPost: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  postId,
  handleSelectedPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`User #${post.userId}: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleSelectedPost(post.id)}
            >
              {postId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
