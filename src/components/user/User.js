import React from 'react';

function User ({ user }) {
  return (
    <div className="meta">
      <span>{ user.name }</span>
      <a href={`mailto:${user.email}`}>{ user.email }</a>
      <p>
        <span>Street: { user.address.street }</span>
        <span>City: { user.address.city }</span>
        <span>Suite: { user.address.suite }</span>
      </p>
    </div>
  );
}

export default User;
