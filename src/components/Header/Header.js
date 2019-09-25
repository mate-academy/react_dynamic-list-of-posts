import React from 'react';
import './Header.css';

const Header = ({ posts, searchFunc }) => (
  <>
    <h1>
      <span className="ui red header">Static</span>
      {' '}
      <span className="ui green header">list</span>
      {' '}
      <span className="ui yellow header">of</span>
      {' '}
      <span className="ui blue header">posts</span>
    </h1>
    <div className="ui statistics">
      <div className="teal statistic">
        <div className="value">{posts.length}</div>
        <div className="label">POSTS</div>
      </div>
    </div>
    <div className="ui icon input">
      <input
        type="text"
        name="text-area"
        placeholder="Search Your Post  ❤"
        className="input-area-header"
        onChange={searchFunc}
      />
      <i className="search icon" />
    </div>
  </>
);

export default Header;
