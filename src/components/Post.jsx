import React from 'react'

import User from './User'
import CommentList from './CommentList'
import ButtonComments from './ButtonComments'

class Post extends React.Component {
  state ={
    showComments: false,
  }

  toggleShowComments = () => {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { currentPost } = this.props;
    const { showComments } = this.state;

    return (
      <article className='article'>
        <h2 className='article__title'>{currentPost.title}</h2>
        <section className='article__body'>{currentPost.body}</section>
        <br /> 
        <User user={currentPost.user}/>
        <ButtonComments 
            toggleShowComments={this.toggleShowComments}
            showComments={showComments}
        />
        {
          showComments
            && <CommentList 
              currentComments={currentPost.comments} 
            />
        }
      </article>
    )
  }
}

export default Post