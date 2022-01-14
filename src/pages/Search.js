import React, { Component } from 'react';
import Header from '../components.js/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      songName: '',
      searchBtnDisabled: true,
      loadingStatus: false,
      shouldRedirect: false,
    });

    this.onInputChange = this.onInputChange.bind(this);
    // this.onSearchClick = this.onSearchClick.bind(this);
    this.songValidation = this.songValidation.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.songValidation);
  }

  onSearchClick() {
    const { songName } = this.state;
    this.setState({
      loadingStatus: true,
    });
  }

  songValidation() {
    const SONG_MIN_SIZE = 2;
    const { songName } = this.state;
    if (songName.length >= SONG_MIN_SIZE) {
      this.setState({ searchBtnDisabled: false });
    } else {
      this.setState({ searchBtnDisabled: true });
    }
  }

  render() {
    const { songName, searchBtnDisabled, loadingStatus, shouldRedirect } = this.state;
    return (
      <div>
        <Header />
        <form>
          <input
            type="text"
            id="search-artist-input"
            name="songName"
            data-testid="search-artist-input"
            value={ songName }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchBtnDisabled }
            onClick={ this.onSearchClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
