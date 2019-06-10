import React, { Component } from 'react';
import Comment from './Comment';
import '../css/Comments.css'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      closed: false,
      sign: "-"
    }

    this.showHide = this.showHide.bind(this)
  }

  showHide(event) {
    if (!this.state.closed) {
      this.setState({
        closed: true,
        sign: '+'
      });
    } else {
      this.setState({
        closed: false,
        sign: '-'
      });
    }
    
    event.target.parentNode.nextElementSibling.classList.toggle('visible');
  }

  render() {
    return (
      <React.Fragment>
        <h3>Comments
          <button className="show" onClick = {this.showHide}>{this.state.sign}</button></h3>
        <section className = "comments">
          {this.props.comments.map(comment => <Comment key = {comment.body} text = {comment.body} author = {comment.name} 
          email = {comment.email}/>)}
        </section>
      </React.Fragment>
    );
  }
}

export default Comments;
