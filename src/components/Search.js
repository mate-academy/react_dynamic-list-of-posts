import React from 'react'

export default function Search(props) {
  const { search, value } = props;
  return (
    <>
      <input type="text" onChange={search} value={value}/>
    </>
  )
}
