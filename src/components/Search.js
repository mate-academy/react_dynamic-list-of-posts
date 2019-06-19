import React from 'react'

export const Search = props => {
  const { search, value } = props;
    return (
      <>
        <input type="text" onChange={search} value={value}/>
      </>
    )
}