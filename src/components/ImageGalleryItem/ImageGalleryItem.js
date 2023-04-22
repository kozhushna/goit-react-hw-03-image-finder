import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className={css.galleryItem}>
      <img src={webformatURL} alt={tags} className={css.galleryItemImage} />
    </li>
  );
};
