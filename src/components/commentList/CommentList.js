import React, { Component } from 'react';
import Comment from '../comment/Comment';
import { Accordion } from 'semantic-ui-react';

export default class CommentList extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
  return (
    <Accordion styled>
      <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
        <i className="dropdown icon"></i>
        Show Comments
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          {this.props.comment.map( comment =>
            (<Comment comment={comment} key={comment.id} />))}
        </Accordion.Content>
    </Accordion>
  );
}}
