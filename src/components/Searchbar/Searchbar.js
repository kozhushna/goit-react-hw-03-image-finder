import { React, Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.searchQuery.trim().toLowerCase();
    if (query === '') {
      toast.warn('Please input text for serch.');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <FcSearch size="2em" />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
          />
        </form>
      </header>
    );
  }
}
