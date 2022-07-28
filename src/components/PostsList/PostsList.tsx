/* eslint-disable no-console */
import React from 'react';
import './PostsList.scss';

import { Post } from '../../types/types';

type Props = {
  posts: Post[];
  selectPost: (x: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  return (
    <div className="PostsList">
      <h2>{`Posts: ${props.posts.length}`}</h2>

      <ul className="PostsList__list">

        {props.posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>

            <button
              id={post.id.toString()}
              type="button"
              className="PostsList__button button"
              onClick={(event) => {
                const toggle = props.selectedPostId === post.id
                  ? 0
                  : +event.currentTarget.id;

                props.selectPost(toggle);
              }}
            >
              {props.selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};
