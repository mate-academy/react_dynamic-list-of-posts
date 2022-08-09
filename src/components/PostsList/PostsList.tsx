import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  getPost: (id: number) => void,
  selectedPost: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  getPost,
  selectedPost,
}) => {
  const handleClick = (id: number) => {
    if (selectedPost !== id) {
      getPost(id);
    } else {
      getPost(0);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <>
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClick(post.id)}
              >
                {(selectedPost === post.id)
                  ? 'Close'
                  : 'Open'}
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
