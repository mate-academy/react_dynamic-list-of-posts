import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  openPost: number;
  setOpenPost: (value: number) => void
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, openPost, setOpenPost } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {openPost !== post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setOpenPost(post.id)}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setOpenPost(0)}
                >
                  Close
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
