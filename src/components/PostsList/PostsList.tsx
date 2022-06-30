import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  settingPostId: (id: number) => void,
  postId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  settingPostId,
  postId,
}) => {
  const togglerButton = (idOfPost: number) => {
    settingPostId(idOfPost);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              {post.title}
            </div>
            {postId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  togglerButton(0);
                }}
              >
                <p>Close</p>
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  togglerButton(post.id);
                }}
              >
                <p>Open</p>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
