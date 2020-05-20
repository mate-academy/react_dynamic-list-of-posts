import React from 'react';
import { Address } from '../helpers/typeDefs';

type Props = {
  name: string;
  email: string;
  address: Address;
};

export const User: React.FC<Props> = ({ name, email, address }) => (
  <div>
    <span>User:</span>
    <p>
      Name:
      {name}
    </p>
    <p>
      E-mail:
      {email}
    </p>
    <p>
      {`Address:${address.city}, ${address.street}, ${address.suite}`}
    </p>
  </div>
);
