import React, { FC } from 'react';
import { Address } from '../../interfaces';

interface AddressProps {
  address: Address;
}

export const UserAddress: FC<AddressProps> = ({ address }) => {
  const {
    street,
    suit,
    city,
    zipcode,
  } = address;

  return (
    <li className="user__item user__item--address">
      <p className="user__address-description">
        {`${street}, ${suit}, ${city}, ${zipcode}`}
      </p>
    </li>
  );
};
