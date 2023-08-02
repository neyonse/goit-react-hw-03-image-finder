import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { TbPhotoSearch } from 'react-icons/tb';

export default class Searchbar extends Component {
  state = {};

  onSubmit = e => {
    e.preventDefault();
    console.log('onSubmit');
    const form = e.target;

    const searchQuery = form.elements.search.value;

    this.props.onSubmit(searchQuery);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button className={css.searchFormBtn} type="submit">
            <TbPhotoSearch className={css.searchFormBtnIcon} />
          </button>
          <input
            className={css.searchFormInput}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
