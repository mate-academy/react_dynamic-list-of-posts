import React from 'react';

function User(props) {
  return (
    <div className='users'>
      <h2>{props.userName}</h2>
      <div>Email: <a href={props.email}>{props.email}</a></div>
      <div><strong>Address: </strong>{props.address}</div>
    </div>
  );
}

export default User;
