import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[]
  postId: number,
  setPostId: (id: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts,
  postId,
  setPostId,
}) => {
  const handleButtonOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPostId(+event.currentTarget.name);
  };

  const handleButtonClose = () => {
    setPostId(0);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                User $
                {post.userId}
              </b>
              {post.title}
            </div>
            {postId !== post.id
              ? (
                <button
                  name={`${post.id}`}
                  onClick={handleButtonOpen}
                  type="button"
                  className="PostsList__button button"
                >
                  Open
                </button>
              ) : (
                <button
                  name={`${post.id}`}
                  onClick={handleButtonClose}
                  type="button"
                  className="PostsList__button button"
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
