import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    src: '',
    alt: '',
  };

  showModal = (src, alt) => {
    this.setState({ src, alt, showModal: true });
    console.log({ src, alt });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, src, alt } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          {this.props.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
                onImageClick={this.showModal}
              />
            );
          })}
        </ul>
        {showModal && <Modal src={src} alt={alt} onClose={this.closeModal} />}
      </>
    );
  }
}

export default ImageGallery;
