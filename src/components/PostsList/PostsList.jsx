import React from 'react';
import './PostsList.scss';
import classnames from 'classnames';
import { PostListType } from '../../Shapes';

export const PostsList = ({ posts, onPostSelected, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              {`[User #${post.userId}]: `}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className={classnames(
              'PostsList__button',
              'button',
              { 'PostsList__button--selected': selectedPostId === post.id },
            )}
            onClick={() => onPostSelected(post.id)}
          >
            {selectedPostId === post.id ? (
              'Close'
            ) : ('Open')
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = PostListType;
