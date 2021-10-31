import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  loadPost: (id: number) => void,
  selctedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  loadPost,
  selctedPostId = 0,
}) => (

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
              User
              #
              {post.userId}
              :
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => loadPost(post.id)}
          >
            {selctedPostId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
