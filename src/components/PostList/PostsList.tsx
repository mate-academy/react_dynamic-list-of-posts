// import React, { ChangeEvent, FC, useState } from 'react';
// import { PostItem } from '../PostItem/PostItem';
//
// interface Props {
//   postList: PrepearedUser[];
// }
//
// export const PostsList: FC<Props> = ({ postList }) => {
//   const [inputValue, setInputValue] = useState<string>('');
//   const [visiblePosts, setVisiblePosts] = useState<PrepearedUser[]>([...postList]);
//
//
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//     setVisiblePosts([...postList].filter(post => (
//       post.title.toLowerCase().includes(inputValue.toLowerCase())
//       || post.body.toLowerCase().includes(inputValue.toLowerCase())
//     )));
//   };
//
//   console.log(visiblePosts);
//
//   return (
//     <>
//       <input type="text" value={inputValue} onChange={handleChange} />
//       {
//         visiblePosts.map(post => (
//           <PostItem postItem={post} key={post.id} />
//         ))
//       }
//     </>
//   );
// };


import React, {ChangeEvent, FC, useCallback, useMemo, useState} from 'react';
import debounce from 'lodash/debounce';
import { PostItem } from '../PostItem/PostItem';

interface Props {
  postList: PrepearedUser[];
}

function filterPosts(arr: PrepearedUser[], value: string) {
  console.log('work');
  return [...arr].filter(post => (
    post.title.toLowerCase().includes(value.toLowerCase())
    || post.body.toLowerCase().includes(value.toLowerCase())
  ));
}

export const PostsList: FC<Props> = ({ postList }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filedQuery, setFiledQuery] = useState<string>('');

  const vissiblePosts = useMemo(
    () => filterPosts(postList, filedQuery),
    [filedQuery],
  );

  const setFiledQueryWithDebouce = useCallback(
    debounce(setFiledQuery, 2000),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFiledQueryWithDebouce(event.target.value);
  };


  return (
    <>
      <input type="text" value={inputValue} onChange={handleChange} />
      {
        vissiblePosts.map(post => (
          <PostItem postItem={post} key={post.id} />
        ))
      }
    </>
  );
};
