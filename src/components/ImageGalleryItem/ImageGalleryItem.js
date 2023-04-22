import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) => {
  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.galleryItemImage}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    </li>
  );
};
