import React, { Component } from 'react';
import Commentar from './Comment';

export default class CommentList extends Component {
  render() {
    return (
      <div className="comments">
        {this.props.commetItem.map(commetItem =>
          <Commentar commetItem={commetItem} key={commetItem.name} />)
        }
      </div>
    );
  }
}
