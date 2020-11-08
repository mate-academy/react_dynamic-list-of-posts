import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UserShape } from '../shapes/UserShape';

export const Post = ({ id, title, user, isOpen, toggletPost }) => (
  <li
    className={classNames('PostsList__item', {
      'PostsList__item--open': isOpen,
    })}
  >
    <div className="PostsList__item-wrapper">
      <i className="PostsList__icon far fa-copy" />

      <div className="PostsList__item-content">
        <div className="PostsList__item-user">
          {user.name}
        </div>

        <div className="PostsList__item-title">
          {title}
        </div>
      </div>
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={() => toggletPost(id)}
    >
      {
        isOpen ? 'Hide' : 'Show'
      }
    </button>
  </li>
);

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape(UserShape).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggletPost: PropTypes.func.isRequired,
};
