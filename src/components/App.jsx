import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';

export class App extends Component {
  state = { searchQuery: '' };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
