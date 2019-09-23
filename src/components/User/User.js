import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

const User = ({ name, email, phone, website }) => (
  <div className="content">
    <div className="header">{name}</div>
    <div className="item meta">
      <i className="mail icon" />
      <a href={`mailto:${email}`} className="content">{email}</a>
    </div>
    <div className="item meta">
      <i className="phone icon" />
      <a href={`tel:${phone}`} className="content">{phone}</a>
    </div>
    <div className="item meta">
      <i className="info icon" />
      <a href={`${website}`} className="content">{website}</a>
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
