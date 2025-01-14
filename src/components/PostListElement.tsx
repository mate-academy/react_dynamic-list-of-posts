import React from "react"
import { Post } from "../types/Post"
import classNames from "classnames";

type Props = {
post: Post
setPostSelected: (post: Post | null) => void;
setIsLight: (postId: number | null) => void
isLight: number | null
}

export const PostListElement: React.FC <Props>= ({post, setPostSelected, setIsLight, isLight}) => {

  const condition = isLight !== post.id;

   const setPost = () => { 

    if (condition) {
      setIsLight(post.id)
      setPostSelected(post)
      return;
    }
    setIsLight(null);
    setPostSelected(null);
  }

 return(<tr data-cy="Post">
    <td data-cy="PostId">{post.id}</td>

    <td data-cy="PostTitle">
      {post.title}
    </td>

    <td className="has-text-right is-vcentered">
      <button
        type="button"
        data-cy="PostButton"
        className={classNames("button is-link", {"is-light": condition})}
        onClick={() => {
          
          setPost()
          
        }}
      >
        {condition ? `Open`: 'Close'}
      </button>
    </td>
  </tr>)
}