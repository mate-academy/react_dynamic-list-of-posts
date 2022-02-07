import { Loader } from '../Loader';

type Props = {
  posts: Post[]
  initialize:boolean
  selectedPostId: number,
  setSelectePostId: (postId: number) => void
};

export const PostsListUi: React.FC<Props> = ({
  posts,
  initialize,
  selectedPostId,
  setSelectePostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <div>
      {
        !initialize
          ? <Loader />
          : (
            <ul className="PostsList__list">
              {posts.map(post => (
                <li className="PostsList__item" key={post.id}>
                  <div>
                    <b>
                      {`User #${post.userId}: `}
                    </b>
                    sunt aut facere repellat provident occaecati excepturi optio
                  </div>

                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => setSelectePostId(post.id)}
                  >
                    {selectedPostId === post.id ? 'Close' : 'Open'}
                  </button>
                </li>
              ))}
            </ul>
          )
      }
    </div>
  </div>
);
