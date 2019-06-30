import React from 'react';
import User from './User';
import CommentList from './CommentList';

export default function Post (props) {
     return (
      <tr>
        <td>{
          props.data.title}
        </td>
        <td>{
          props.data.body}
        </td>
        <User author={props.data.users} />
        <CommentList comments={props.data.comments} />
      </tr>
    );
  }
