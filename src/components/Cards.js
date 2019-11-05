import React, { Component } from 'react';
import DropDown from './Accordion';
import User from './User';

class Cards extends Component {
  render() {
    const {
      post: {
        user, title, body, comments,
      },
    } = this.props;
    const wide = Math.round(Math.random() * (410 - 390) + 430);
    const height = Math.round(Math.random() * (410 - 390) + 430);

    return (
      <div className="ui grid centered card__box">
        <div className="ui card eight wide column">
          <div className="image">
            <img src={`https://source.unsplash.com/${wide}x${height}/?man,girl,blog,posts,notes,fashion`} alt="post" />
          </div>
          <div className="content">
            <div className="header">{title}</div>
            <User user={user} />
            <div className="description">
              <p>{body}</p>
            </div>
          </div>
          <DropDown comments={comments} />
        </div>
      </div>
    );
  }
}

export default Cards;
