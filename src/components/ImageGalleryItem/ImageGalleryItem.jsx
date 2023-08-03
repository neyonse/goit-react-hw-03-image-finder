import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageInfo: { webformatURL, tags } }) => {
  return (
    <li className={css.galleryItem}>
      <img className={css.galleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
