import React from 'react';

type Props = {
  author: UserProps;
};

const UserInfo: React.FC<Props> = ({ author }) => {
  const {
    city, zipcode, street, suite,
  } = { ...author.address };

  return (
    <p className="address">
      City:&nbsp;
      {city}
      , zipcode:&nbsp;
      {zipcode}
      , street:&nbsp;
      {street}
      , suite:&nbsp;
      {suite}
    </p>
  );
};

export default UserInfo;
