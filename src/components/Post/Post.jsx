import React from 'react';
import cn from 'classnames';

export const Post = ({ userId, title, id, selectedPostId, selectPostId }) => (
  <li className="PostsList__item">
    <div>
      <b>[User #{userId}]: </b>
      {title}
    </div>
    <button
      onClick={()=>selectPostId(id)}
      type="button"
      className={cn('PostsList__button button', {
        'button--is-active': id === selectedPostId,
      })}
    >
      {id === selectedPostId ? 'Close' : 'Open'}
    </button>
  </li>
);
