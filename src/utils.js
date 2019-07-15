const getPostsByFilter = (posts, searchText) => {
  const filteringPosts = [...posts].filter(post => (
    (post.title.includes(searchText) || post.body.includes(searchText))
  ));
  return filteringPosts;
};

export default getPostsByFilter;
