import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components.js/Header';
import Loading from '../components.js/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      artist: '',
      artistSearch: '',
      searchBtnDisabled: true,
      // loadingStatus: false,
      // shouldRedirect: false,
      albumList: [],
      notFoundStatus: false,
    });

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.songValidation = this.songValidation.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.songValidation);
  }

  onSearchClick(event) {
    event.preventDefault();
    const { artist } = this.state;
    // this.setState({ loadingStatus: true });
    searchAlbumsAPI(artist).then((info) => {
      this.setState({
        albumList: [...info],
        artistSearch: artist,
        artist: '',
        notFoundStatus: info.length === 0,
      });
    });
  }

  songValidation() {
    const SONG_MIN_SIZE = 2;
    const { artist } = this.state;
    if (artist.length >= SONG_MIN_SIZE) {
      this.setState({ searchBtnDisabled: false });
    } else {
      this.setState({ searchBtnDisabled: true });
    }
  }

  render() {
    const {
      albumList,
      artist,
      artistSearch,
      searchBtnDisabled,
      // loadingStatus,
      notFoundStatus } = this.state;
    return (
      <div>
        <Header />
        <form>
          <input
            type="text"
            id="search-artist-input"
            name="artist"
            data-testid="search-artist-input"
            value={ artist }
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
        {notFoundStatus && <h2>Nenhum álbum foi encontrado</h2>}
        {albumList.length >= 1 && (
          <div>
            <h1>
              Resultado de álbuns de:
              { ' '}
              { artistSearch }
            </h1>
            {albumList.map((album) => (
              <div key={ album.collectionId }>
                <h2 key={ album.collectionId }>{ album.collectionName }</h2>
                <h3 key={ album.artistName }>
                  { album.artistName }
                </h3>
                <img src={ album.artworkUrl100 } alt={ `${album.collectionName}` } />
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `album/${album.collectionId}` }
                >
                  Album page
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
