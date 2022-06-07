/* eslint-disable no-console */
import {
  FC, useState, useEffect,
} from 'react';
import { getPostComments, getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectPostId: number;
  // onSelectPost: (postId: number) => void;
};

export const PostDetails: FC<Props> = ({
  // onSelectPost,
  selectPostId,
}) => {
  const [post, setPost] = useState<Post>(Object);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleComment, setIsVisibleComment] = useState(false);

  const toggleCommentSection = () => {
    setIsVisibleComment(!isVisibleComment);
  };

  useEffect(() => {
    getPostDetails(selectPostId).then((data) => {
      setPost(data);
    });
  }, [selectPostId]);

  useEffect(() => {
    getPostComments(selectPostId).then((data) => {
      setComments(data);
    });
  }, [selectPostId]);

  console.log('comments', comments);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={toggleCommentSection}
          >
            {isVisibleComment
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>

          <ul className="PostDetails__list">
            {isVisibleComment && comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};

// body: " gjhkbjlnk;ml,"
// createdAt: "2022-04-17T18:44:16.357Z"
// email: "hjkl@jakasvjk.com"
// id: 19083
// name: "vjblnjlk;l"
// postId: 87
// updatedAt: "2022-04-17T18:44:16.357Z
