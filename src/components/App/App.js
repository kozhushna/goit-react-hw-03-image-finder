import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import getImages from '../../services/pixabay-api';
import Loader from 'components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showLoadMoreBtn: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const data = await getImages(this.state.searchQuery, this.state.page);

        if (!data.images.length) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.images],
          showLoadMoreBtn: this.state.page < Math.ceil(data.total / 12),
        }));
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmitForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      isEmpty: false,
      showLoadMoreBtn: false,
    });
  };

  render() {
    return (
      <div className={css.app}>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.onSubmitForm} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.showLoadMoreBtn && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

export default App;
