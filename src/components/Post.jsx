import React from 'react'

import User from './User'
import CommentList from './CommentList'
import ButtonComments from './ButtonComments'

class Post extends React.Component {
  state ={
    showComments: false,
  }

  showCommentsFunc = () => {
    this.setState(prevState => ({
      showComments: prevState.showComments === true ? false : true,
    }))
  }

  render() {
    return (
      <article className='article'>
        <h2 className='article__title'>{this.props.currentPost.title}</h2>
        <section className='article__body'>
          {this.props.currentPost.body}
        </section> <br />
        <User user={this.props.currentPost.user}/>
        <ButtonComments 
            showCommentsFunc={this.showCommentsFunc}
            showComments={this.state.showComments}
        />
        {
          this.state.showComments
            && <CommentList currentComments={this.props.currentPost.comments} />
        }

      </article>
    )
  }
}

export default Post