import React from 'react';
import './PostsList.scss';
import { Loader } from '../Loader';

export const PostsList = ({ userPosts, setSelectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {userPosts === null && (<Loader />)}
      {userPosts && userPosts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>

          <button
            type="button"
            className="PostsList__button button"
            onClick={() => setSelectedPostId(post.id)}
          >
            Open
          </button>
        </li>
      ))
      }
    </ul>
  </div>
);
