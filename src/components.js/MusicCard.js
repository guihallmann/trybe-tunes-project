import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    // const { value } = target;
    this.setState({
      loadingStatus: true,
    });
    (addSong(this.props).then(() => {
      this.setState({
        loadingStatus: false,
      });
    }));
    getFavoriteSongs().then((info) => console.log(info));
  }

  render() {
    const { trackId, trackName, trackPreview } = this.props;
    const { loadingStatus } = this.state;
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
