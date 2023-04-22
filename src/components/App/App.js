import { Component } from 'react';
import fetchImages from '../../services/pixabay-api';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    images: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  async componentDidMount() {
    const images = await fetchImages('cat', 1);
    this.setState(images);
    console.log(images);
  }

  onSubmit(searchQuery) {
    console.log(searchQuery);
  }

  render() {
    return (
      <div className="container">
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
