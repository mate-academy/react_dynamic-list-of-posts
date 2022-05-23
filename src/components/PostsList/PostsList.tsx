import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Array<Post> | null;
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  if (!posts) {
    return (
      <h1>
        No one posts is avalible
      </h1>
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}
            post id
          </li>
        ))}
        {/* <li className="PostsList__item">
          <div>
            <b>[User #1]: </b>
            sunt aut facere repellat provident occaecati excepturi optio
          </div>
          <button
            type="button"
            className="PostsList__button button"
          >
            Close
          </button>
        </li>

        <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        </li> */}
      </ul>
    </div>
  );
};
