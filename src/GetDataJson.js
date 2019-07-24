import PropTypes from 'prop-types';

const GetDataJson = async(url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

GetDataJson.PropTypes = {
  url: PropTypes.string,
};

export default GetDataJson;
