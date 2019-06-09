import React from 'react';

export default class Commentar extends React.Component {
  render() {
    return (
      <div>
        <cite>{this.props.commetItem.name}</cite>
        <blockquote>{this.props.commetItem.body}</blockquote>
      </div>
    );
  }
}
