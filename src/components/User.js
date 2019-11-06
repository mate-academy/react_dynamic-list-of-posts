import React from 'react';

function User({ user }) {
  return (
    <div className="content">
      <div className="ui small feed author">{user.name}</div>
      <div className="ui small feed">
        {`
          ${user.email}, 
          ${user.address.city}, ${user.address.street} 
          ${user.address.suite}, ${user.address.zipcode}
        `}
      </div>
    </div>
  );
}

export default User;
