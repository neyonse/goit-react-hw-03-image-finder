import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageInfo: { webformatURL, tags } }) => {
  return (
    <li className={css.galleryItem}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
