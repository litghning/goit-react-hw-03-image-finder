import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tag, onClick }) => {
  return (
    <>
      <GalleryItem>
        <GalleryItemImg src={webformatURL} alt={tag} onClick={onClick} />
      </GalleryItem>
    </>
  );
};
ImageGalleryItem.prototype = {
  webformatURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
  onClick: PropTypes.func,
};
export default ImageGalleryItem;
