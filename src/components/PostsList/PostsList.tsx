import React from 'react';
import { Post } from '../../types';
import './PostsList.scss';

type Props = {
  posts: Post[];
  postId: number;
  changePostId: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, postId, changePostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
          data-cy="postDetails"
        >
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            <p>{post.body}</p>
          </div>
          {post.id === postId ? (
            <button
              type="button"
              className="PostsList__button PostsList__button--act button"
              onClick={() => {
                changePostId(0);
              }}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                changePostId(post.id);
              }}
            >
              Open
            </button>
          )}

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
