import React from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';

export const Header = ({ posts, userId, setUserId, setUserPosts, setIsPostSelected }) => {
  const handleSelect = (e) => {
    if (e.target.value === '0') {
      setUserId(0);
      setUserPosts(posts);
      setIsPostSelected(false)
    } else {
      setUserId(+e.target.value);
      setIsPostSelected(false)
      getUserPosts(e.target.value)
        .then(userPosts => setUserPosts(userPosts));
    }
  };

  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          value={userId}
          onChange={handleSelect}
        >
          <option value="0">All users</option>
          <option value="1">Leanne Graham</option>
          <option value="2">Ervin Howell</option>
          <option value="3">Clementine Bauch</option>
          <option value="4">Patricia Lebsack</option>
          <option value="5">Chelsey Dietrich</option>
          <option value="6">Mrs. Dennis Schulist</option>
          <option value="7">Kurtis Weissnat</option>
          <option value="8">Nicholas Runolfsdottir V</option>
          <option value="9">Glenna Reichert</option>
          <option value="10">Leanne Graham</option>
        </select>
      </label>
    </header>
  );
};

Header.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
    }),
  ).isRequired,
  userId: PropTypes.number.isRequired,
  setUserId: PropTypes.func.isRequired,
  setUserPosts: PropTypes.func.isRequired,
};
