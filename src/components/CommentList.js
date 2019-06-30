import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
  return (
    <td>
      <Comment comments={props.comments} />
    </td >
  );
}
