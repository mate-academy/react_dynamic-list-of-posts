import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  detailedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { detailedPostId } = props;
  const [postDetail, getPostDetail] = useState({} as Post);
  const [comments, getComments] = useState([] as Comment[]);
  const [isCommentsChange, setCommentChange] = useState(true);
  const [isCommentsVisible, setCommentsVisibility] = useState(true);

  const removeComment = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    deletePostComment(id);
    setCommentChange(prevState => (!prevState));
  };

  useEffect(() => {
    if (detailedPostId !== 0) {
      getPostDetails(detailedPostId)
        .then((data) => getPostDetail(data));
    }

    getPostComments()
      .then((data: Comment[]) => getComments(data
        .filter(commentItem => commentItem.postId === detailedPostId)));
  }, [isCommentsChange, postDetail, isCommentsVisible]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetail.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsVisibility(prevState => (!prevState))}
        >
          Hide&nbsp;
          {comments.length}
          &nbsp;comments
        </button>
        <ul className="PostDetails__list">
          {isCommentsVisible && comments.map(comment => comment.body !== '' && (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={(event) => removeComment(event, comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm detailedPostId={detailedPostId} />
        </div>
      </section>
    </div>
  );
};
