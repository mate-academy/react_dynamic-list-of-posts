import React from 'react';
import './User.css';
import { User as UserInterface } from '../../interfaces';

export const User = ({ name, email, address, id }: UserInterface) => (
  <div className="user" key={id}>

    <b className="user__name">
      {name}
        &nbsp;
    </b>

    <small className="user__mail">{email}</small>

    <div className="user__address">
      <p>
        {address.city}
      </p>
      <p>
        {address.street}
          &nbsp;
        {address.suite}
      </p>
      <p>
        {address.zipcode}
      </p>
    </div>

  </div>
)
