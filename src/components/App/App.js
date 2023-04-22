import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import getImages from '../../services/pixabay-api';
import Loader from 'components/Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showLoadMoreBtn: false,
    isLoading: false,
    isEmpty: false,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const data = await getImages(this.state.searchQuery, this.state.page);
        console.log(data);

        if (!data.images.length) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.images],
          showLoadMoreBtn: this.state.page < Math.ceil(data.total / 12),
        }));
      } catch (error) {
        console.log(error);
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  //  async componentDidUpdate(prevProps, prevState) {
  //     if (
  //       prevState.searchQuery !== this.state.searchQuery ||
  //       prevState.page !== this.state.page
  //     ) {
  //       this.setState({ isLoading: true,  });

  //     }
  //   }

  onSubmitForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      isEmpty: false,
      error: '',
      showLoadMoreBtn: false,
    });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.showLoadMoreBtn && <Button onClick={this.loadMore} />}
        {this.state.isEmpty && (
          <p>
            Sorry, there are no images matching your search query. Please try
            again.
          </p>
        )}
      </div>
    );
  }
}

export default App;
