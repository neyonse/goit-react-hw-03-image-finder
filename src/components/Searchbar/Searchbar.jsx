import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { TbPhotoSearch } from 'react-icons/tb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  resetForm() {
    this.setState({ inputValue: '' });
  }

  onSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.warn('Search bar is empty! Please enter a search query.');
      this.resetForm();
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.resetForm();
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
            value={this.state.inputValue}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
