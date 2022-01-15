import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components.js/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components.js/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumSongs: [],
      albumName: '',
      bandName: '',
      albumCover: '',
    };
  }

  componentDidMount() {
    // console.log(this.props);
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((info) => {
      const { artworkUrl100, artistName, collectionName } = info[0];
      const songsList = info.filter((song) => song.kind === 'song');
      this.setState({
        albumSongs: [...songsList],
        albumName: collectionName,
        bandName: artistName,
        albumCover: artworkUrl100,
      });
    });
  }

  render() {
    const { albumSongs, albumName, bandName, albumCover } = this.state;
    return (
      <>
        <Header />
        <div>
          <h2 data-testid="artist-name">{ bandName}</h2>
          <h3 data-testid="album-name">{ albumName }</h3>
          <img src={ albumCover } alt={ albumName } />
          <div className="songs-list">
            { albumSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackId={ song.trackId }
                trackName={ song.trackName }
                trackPreview={ song.previewUrl }
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
Album.propTypes = {

};
export default Album;
