import { LoadMoreBtn } from './LoadMore.styled';
import PropTypes from 'prop-types';
const LoadMore = ({ onClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load More
    </LoadMoreBtn>
  );
};
LoadMore.prototype = {
  onClick: PropTypes.func,
};
export default LoadMore;