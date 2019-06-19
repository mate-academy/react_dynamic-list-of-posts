import React from 'react';
import './User.css';

export const User = props => {
  const {
    name,
    email,
    address,
  } = props;
  return (
    <div class = "user">   
    <p>
     <strong>Name of auhtor:</strong>
    </p>
    <p>       
    {name}
    </p>
    <p>
     <strong>Email:</strong>
    </p>
    <p>
    {email}
    </p>
    <p>
     <strong>Address:</strong>
    </p>
    <p>
    {address.street}
    </p>
    <p>
    {address.suite}
    </p>
    <p>
    {address.sity}
    </p>
    <p>
    {address.zipcode}
    </p>
    <p>
    <p>{address.geo.lat}</p>
    {address.geo.lng}
    </p>
    </div>
  );
};

