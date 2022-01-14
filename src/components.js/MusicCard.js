import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackId, trackName, trackPreview } = this.props;
    return (
      <div key={ trackId }>
        <span key={ trackId }>{ trackName }</span>
        <audio data-testid="audio-component" src={ trackPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
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
