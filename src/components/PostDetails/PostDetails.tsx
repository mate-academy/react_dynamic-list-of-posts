import { FC, useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postId: number
}

export const PostDetails: FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId !== 0) {
      getPostDetails(postId).then(data => setPost(data));
    } else {
      setPost(null);
    }
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {post && (
        <>
          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button type="button" className="button">Hide 2 comments</button>

            <ul className="PostDetails__list">
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>My first comment</p>
              </li>

              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>sad sds dfsadf asdf asdf</p>
              </li>
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
