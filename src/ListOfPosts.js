import React from 'react';
import Post from './Post';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

class ListOfPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsUserComments: [...this.props.postList],
      filteredPosts: [...this.props.postList],
      visibleComments: [],
      searchPostString: '',
      commentingPostId: null,
      changeStatus: 0,
    };
  }

  rerander = () => {
    if (this.props.changeStatus > this.state.changeStatus) {
      this.setState({
        postsUserComments: [...this.props.postList],
        filteredPosts: [...this.props.postList],
        changeStatus: this.props.changeStatus,
      });
      this.handleCommentFormClose();
    }
  }

  addVisibleComment = (id) => {
    let visCom = [...this.state.visibleComments];
    const index = visCom.findIndex(visId => visId === id);

    index >= 0 ? visCom.splice(index, 1) : visCom.push(id);

    this.setState({
      visibleComments: [...visCom],
    });
  }

  filterPosts = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      searchPostString: value,
      filteredPosts: prevState.postsUserComments.filter(post => (
        post.title.toLowerCase().includes(value.toLowerCase())
        || post.body.toLowerCase().includes(value.toLowerCase())
      )),
    }));
  }

  handleCommentFormClose = () => (
    this.setState({ commentingPostId: null })
  )

  render() {
    this.rerander();

    return (
      <>
        <h1>Instantly Dynamic list of {this.state.filteredPosts.length} posts was Loaded</h1>

        <input
          type="text"
          placeholder="Search for Post"
          value={this.state.searchPostString}
          onChange={this.filterPosts}
        />

        {this.state.filteredPosts.map(post => (
          <article>
            <Post
              name={post.user.name}
              email={post.user.email}
              address={post.user.address}
              title={post.title}
              body={post.body}
            />

            <div className="cmntsN">
              <div
                className="cmntsAdd"
                onClick={() => this.setState({ commentingPostId: post.id })}
              >
                <b>
                  Add new Comment
                </b>
              </div>

              <div
                className="cmntsShow"
                onClick={() => this.addVisibleComment(post.id)}
              >
                <b>
                  {this.state.visibleComments.includes(post.id)
                    ? '----- Close Comments'
                    : `----- View ${post.comments.length} comments`
                  }
                </b>
              </div>
            </div>

            {this.state.commentingPostId === post.id
              && (<AddCommentForm
                    postId={post.id}
                    addComment={this.props.addCommentHandler}
                    handleClose={this.handleCommentFormClose}
                  />)
            }

            {this.state.visibleComments.includes(post.id)
              && post.comments.map(comment => Comment(comment))
            }

          </article>
        ))}
      </>
    );
  }
}

export default ListOfPosts;
