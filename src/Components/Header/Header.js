import React from 'react';
import './Header.css';
import { HeaderProps } from '../PropTypes/PropTypes';

const Header = ({ posts, users, comments }) => (
  <div className="header">
    <h1 className="header__title">Static list of posts</h1>
    <p className="header__text">
      <span className="header__span">posts: </span>
      {posts.length}
    </p>

    <p className="header__text">
      <span className="header__span">comments: </span>
      {comments.length}
    </p>

    <p className="header__text">
      <span className="header__span">Users: </span>
      {users.length}
    </p>
  </div>
);

Header.propTypes = HeaderProps;

export default Header;
