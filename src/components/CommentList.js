import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
  render() {
    return (
     <td>
       <Comment comments={this.props.comments} />
     </td>
   );
  }
}
