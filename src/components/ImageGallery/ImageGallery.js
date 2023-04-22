import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={css.gallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
