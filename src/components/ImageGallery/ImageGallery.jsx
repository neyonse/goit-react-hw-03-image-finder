import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { APIservices } from 'utils';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
    data: [],
    total: '',
    page: 1,
    status: 'idle',
    showBtn: false,
    showBtnLoader: false,
  };

  async fetchImages(searchQuery, page) {
    try {
      const { status, showBtn } = this.state;

      if (status === 'idle') {
        this.setState({ status: 'pending' });
      }

      if (showBtn) {
        this.setState({ showBtnLoader: true });
      }

      const { hits, total } = await APIservices.fetchImages(searchQuery, page);

      this.setState({ total, status: 'resolved', showBtnLoader: false });
      this.setState(prevState => ({ data: [...prevState.data, ...hits] }));

      if (hits.length < 12) {
        this.setState({ showBtn: false });
        return;
      }

      this.setState({ showBtn: true });
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newSearchQuery = this.props.searchQuery;
    const { searchQuery, data, page } = this.state;

    if (prevProps.searchQuery !== newSearchQuery) {
      this.setState({
        searchQuery: newSearchQuery,
        data: [],
        page: 1,
        status: 'idle',
      });

      this.fetchImages(newSearchQuery, 1);
      return;
    }

    if (prevState.page !== page && data.length !== 0) {
      this.fetchImages(searchQuery, page);
      return;
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, data, total, status, showBtn, showBtnLoader } =
      this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <p>Loading images... Please, wait.</p>;
    }

    if (status === 'rejected') {
      return (
        <p>Sorry! Something went wrong. Please, try another search query.</p>
      );
    }

    if (status === 'resolved') {
      return (
        <section className={css.gallerySection}>
          {total === 0 && (
            <p className={css.galleryMessage}>
              Sorry! We found no images for "{searchQuery}"!
            </p>
          )}
          {total && (
            <p className={css.galleryMessage}>
              We found {total} images for "{searchQuery}"!
            </p>
          )}
          <ul className={css.gallery}>
            {data.map(el => (
              <ImageGalleryItem key={el.id} imageInfo={el} />
            ))}
          </ul>
          {showBtn && !showBtnLoader && (
            <Button onClick={this.handleLoadMore} />
          )}
          {showBtnLoader && <p>Loading images... Please, wait.</p>}
        </section>
      );
    }
  }
}
