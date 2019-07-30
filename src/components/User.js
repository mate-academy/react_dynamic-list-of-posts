import React from 'react';
import PropTypes from 'prop-types';

function User({ userData }) {
  return (
    <div className="post-list__post-author-info">
      <div>
        <span className="post-list__post-author-info_name">Author:</span>
        {` ${userData.name}`}
      </div>
      <div>
        <span className="post-list__post-author-info_address">Address:</span>
        {` ${userData.address.city}`}
        ,
        {` ${userData.address.street}`}
        ,
        {` ${userData.address.suite}`}
      </div>
      <div>
        <span className="post-list__post-author-info_email">email:</span>
        {` ${userData.email}`}
      </div>
    </div>
  );
}

User.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      suite: PropTypes.string,
    }).isRequired,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
