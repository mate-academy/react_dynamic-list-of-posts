import React, { useState, useEffect } from 'react';
import { getPostDetails, getPostComments } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number
}

interface Comment {
  id: number
  postId: number,
  name: string
  email: string
  body: string
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleList, changeVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => {
        setPost(result);
      });

    getPostComments(selectedPostId)
      .then(result => {
        setComments(result);
      });
  }, [selectedPostId]);

  const removeComment = (idComment: string) => {
    setComments(comments.filter(item => item.id !== +idComment));
  };

  const addComment = (name: string, email: string, comment: string, id: number) => {
    let maxPostId = 1;

    if (comments.length > 0) {
      maxPostId = Math.max.apply(null, [...comments].map(item => item.postId)) + 1;
    }

    const newObj: Comment = {
      id,
      postId: maxPostId,
      name,
      email,
      body: comment,
    };

    setComments([...comments, newObj]);
  };

  return post && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        { comments.length > 0
          ? (
            <button
              type="button"
              className="button"
              onClick={() => changeVisible(!visibleList)}
            >
              {`${visibleList ? 'Hide' : 'Show'} ${comments.length} comments`}

            </button>
          ) : <h3>There is no comments</h3>}

        {visibleList && (
          <ul className="PostDetails__list">
            {comments.map((comment: Comment) => {
              const { body, postId, id } = comment;

              return (
                <li key={postId} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    value={id}
                    onClick={(event) => {
                      removeComment(event.currentTarget.value);
                    }}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm id={post.id} addComent={addComment} />
        </div>
      </section>
    </div>
  );
};
