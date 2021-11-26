import { Fragment } from 'react';
import './PostsList.scss';

interface Porps {
  posts: Post[] | null,
  postByUserId: number | null,
  showPost: (id:number) => void,
  activePost: number | undefined,
}

export const PostsList: React.FC<Porps> = ({
  posts, postByUserId, showPost, activePost,
}) => {
  return (
    (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {posts?.map(({ id, title, userId }) => (
            <Fragment key={id}>
              {postByUserId === 0
                ? (
                  <li key={id} className="PostsList__item">
                    <div>
                      <b>
                        [User #
                        {userId}
                        ]:
                        {' '}
                      </b>
                      {title}
                    </div>
                    <button
                      type="button"
                      className={`PostsList__button button ${activePost === id && 'active_btn'}`}
                      onClick={() => {
                        showPost(id);
                      }}
                    >
                      {activePost === id ? 'Close' : 'Open'}
                    </button>
                  </li>
                )
                : postByUserId === userId
                && (
                  <li key={id} className="PostsList__item">
                    <div>
                      <b>
                        [User #
                        {userId}
                        ]:
                        {' '}
                      </b>
                      {title}
                    </div>
                    <button
                      type="button"
                      className={`PostsList__button button ${activePost === id && 'active_btn'}`}
                      onClick={() => {
                        showPost(id);
                      }}
                    >
                      {activePost === id ? 'Close' : 'Open'}
                    </button>
                  </li>
                )}
            </Fragment>
          ))}
        </ul>
      </div>
    )
  );
};
