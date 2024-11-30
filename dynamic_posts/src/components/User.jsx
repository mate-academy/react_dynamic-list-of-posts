import React from 'react'

export default function User(props) {
  const {name, email, address} = props;
  let displayAddress = null;
  if (!address) {
    displayAddress = props.address;
  }
  return (
    <>
      <br />
      {name}
      <br />
      {email}
      <br />
      {displayAddress}
    </>
  )
}

