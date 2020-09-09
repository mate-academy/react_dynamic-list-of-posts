import React from 'react';
import './PostsList.scss';

export const PostsList = () => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      <li className="PostsList__item">
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
      </li>
    </ul>
  </div>
);
