import React, {Component} from "react";
 import ImageGalleryItem from '../ImageGalleryItem';
 import Loader from '../Loader';
 import LoadMore from 'components/LoadMore';
 import { ImageGalleryList } from './ImageGallery.styled';
 import Modal from '../Modal';

class ImageGallery extends Component {
    state ={
      showModal: false,
      modalImg: '',
      tag: '',
      isLoading: false,
     }
     toggleModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal,
        isLoading: !prevState.isLoading,
      }));
    };
      openModalImg = id => {
        this.toggleModal();
        const image = this.props.images.find(img => img.id === id);
        this.setState({
          modalImg: image.largeImageURL,
          tag: image.tag,
        });
      };

      render() {
        const { images, onLoadMore } = this.props;
        const { isLoading, modalImg, tag, showModal } = this.state;
    
        return (
          <>
            {isLoading && <Loader />}
            <ImageGalleryList>
              {images.map(({ id, webformatURL, tag }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  tag={tag}
                  onClick={() => this.openModalImg(id)}
                />
              ))}
            </ImageGalleryList>
            {images.length > 11 && <LoadMore onClick={onLoadMore} />}
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <img src={modalImg} alt={tag} />
              </Modal>
            )}
          </>
        );
      }
    }
export default ImageGallery;