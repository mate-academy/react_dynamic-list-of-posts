import React, { FC } from 'react';
import { UserProps } from '../types';

import './User.css';

interface Props {
  user: UserProps;
}

export const User: FC<Props> = ({ user: { name, email, address } }) => (
  <li className="user">
    <h3 className="user__title">
      {name}
    </h3>
    <p className="user__email">
      <span>
        e-mail:
        {` ${email}`}
      </span>
    </p>
    <p className="user__address">
      <span>
        street:
        {` ${address.street}`}
      </span>

      <span>
        suite:
        {` ${address.suite}`}
      </span>

      <span>
        city:
        {` ${address.city}`}
      </span>

      <span>
        zipcode:
        {` ${address.zipcode}`}
      </span>
    </p>
  </li>
);
