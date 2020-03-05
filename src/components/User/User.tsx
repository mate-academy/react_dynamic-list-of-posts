import React, { FC } from 'react';
import './User.css';

interface Props {
  person: User;
}

export const User: FC<Props> = ({ person }) => {
  return (
    <div className="user">
      <h3 className="user__heading">
        {person.name}
      </h3>
      <p className="user__email">
        E-mail:
        <span>
          {` ${person.email}`}
        </span>
      </p>
      <address className="user__address">
        <span>
          street:
          {` ${person.address.street}`}
        </span>
        <span>
          suite:
          {` ${person.address.suite}`}
        </span>
        <span>
          city:
          {` ${person.address.city}`}
        </span>
        <span>
          zipcode:
          {` ${person.address.zipcode}`}
        </span>
      </address>
    </div>
  );
};
