import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: false,
      favsList: [],
      isFavorite: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.checkFavorites = this.checkFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleCheck({ target }) {
    this.setState({
      loadingStatus: true,
    });
    if (target.checked) {
      (addSong(this.props).then(() => {
        this.setState({
          loadingStatus: false,
          isFavorite: true,
        });
      }));
      // getFavoriteSongs().then((info) => console.log(info));
    } else {
      (removeSong(this.props).then(() => {
        this.setState({
          loadingStatus: false,
          isFavorite: false,
        });
      }));
    }
  }

  // As funções getFavorites e checkFavorites, relacionadas ao requisito 9,
  // fiz a partir da dúvida do Iago Medeiros e respostas do Matheus Ferreira
  // nessa thread do slack: https://trybecourse.slack.com/archives/C02EZT1EJSY/p1642425709246000

  getFavorites = async () => {
    const favs = await getFavoriteSongs();
    this.setState({
      favsList: favs,
    }, this.checkFavorites);
  }

  checkFavorites() {
    const { trackId } = this.props;
    const { favsList } = this.state;
    const favCheck = favsList.some((song) => song.trackId === trackId);
    this.setState({
      isFavorite: favCheck,
    });
  }

  render() {
    const { trackId, trackName, trackPreview } = this.props;
    const { loadingStatus, isFavorite } = this.state;
    return (
      <div key={ trackId }>
        <span key={ trackId }>{ trackName }</span>
        <audio data-testid="audio-component" src={ trackPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox-input">
          Favorita
          <input
            type="checkbox"
            id="favorite-input"
            name="favoriteCheckbox"
            data-testid={ `checkbox-music-${trackId}` }
            value={ trackName }
            onChange={ this.handleCheck }
            checked={ isFavorite }
          />
        </label>
        { loadingStatus && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: propTypes.number.isRequired,
  trackName: propTypes.string.isRequired,
  trackPreview: propTypes.string.isRequired,
};

export default MusicCard;
