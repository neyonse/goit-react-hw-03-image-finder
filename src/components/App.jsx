import React, { Component } from 'react';
import css from './App.module.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import Modal from 'components/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  showLargeImage = (largeImageURL, alt) => {
    this.setState({ largeImageURL, alt });
    this.toggleModal();
  };

  render() {
    const { searchQuery, showModal, largeImageURL, alt } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          showLargeImage={this.showLargeImage}
        />
        <ToastContainer />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </div>
    );
  }
}
