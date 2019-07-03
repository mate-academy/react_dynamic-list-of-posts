import React from 'react';

const Users = ({ post }) => (
  <>
    <div className="AuthorContact">
      <p>
        Author name:
        {' '}
        {post.user.name}
      </p>
      <p>
       E-maill:
        {' '}
        {post.user.email}
      </p>
      <p>
        Address:
        {' '}
        {post.user.address.city}
        {' '}
        {post.user.address.street}
,
        {' '}
        {post.user.address.suite}
      </p>
    </div>

  </>
);

export default Users;
