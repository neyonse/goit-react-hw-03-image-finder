import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { APIservices } from 'utils';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
    data: null,
    page: 1,
  };

  async fetchImages(newSearchQuery) {
    try {
      const data = await APIservices.fetchImages(newSearchQuery);

      if (data.totalHits === 0) {
        //   noSearchResultsMessage();
        console.log('no images found');
        return;
      }

      //   if (refs.galleryEl.children.length >= response.totalHits) {
      //     showEl(refs.totalImagesFoundMessageEl);
      //     hideEl(refs.loadMoreBtnEl);
      //     showEl(refs.galleryEndMessageEl);
      //     return;
      //   }

      this.setState({ data, page: this.state.page + 1 });
    } catch (error) {
      // errorMessage();
      console.log(error);
    }
  }

  componentDidUpdate(prevProps) {
    const newSearchQuery = this.props.searchQuery;

    if (prevProps.searchQuery !== newSearchQuery) {
      this.setState({ searchQuery: newSearchQuery });
      this.fetchImages(newSearchQuery);
    }
  }

  render() {
    const { searchQuery } = this.props;
    const { data } = this.state;
    let total = 0;
    if (data) {
      total = this.state.data.total;
    }

    return (
      data && (
        <>
          <p>
            We found {total} images for {searchQuery}
          </p>
          <ul className={css.gallery}>
            {data &&
              data.hits.map(el => (
                <ImageGalleryItem key={el.id} imageInfo={el} />
              ))}
          </ul>
        </>
      )
    );
  }
}
