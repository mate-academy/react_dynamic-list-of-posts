import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => (

  <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Body</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{comment.name}</td>
        <td>{comment.email}</td>
        <td>{comment.body}</td>
      </tr>
    </tbody>
  </table>
);
