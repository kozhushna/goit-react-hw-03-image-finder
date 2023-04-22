import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

// import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQueryChange}
          />
        </form>
      </header>
    );
  }
}
