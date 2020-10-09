import { action, configure, observable } from 'mobx';
import TrackItem from '../models/TrackItem';
import Spotify from '../remote-data-sources/Spotify';

configure({ enforceActions: 'observed' });

class AlbumRepo {
  @observable
  error = null;

  @observable
  unexpectedError = null;

  @observable
  albumItem = null;

  @observable
  trackItems = [];

  @observable
  currentlyPlayingId = null;

  @action
  setPlayingId = trackId => {
    this.currentlyPlayingId = trackId;
  };

  @action
  setAlbum = async albumItem => {
    if (albumItem == this.albumItem) {
      return;
    }

    this.albumItem = albumItem;
    await this.fetchAlbumInfo();
  };

  @action
  fetchAlbumInfo = async () => {
    const queryResult = await Spotify.sendAlbumTracksQuery(this.albumItem.id);
    this.interpretAlbumQueryResult(queryResult);
  };

  @action
  interpretAlbumQueryResult = result => {
    if (result?.resp?.body?.error?.message != null) {
      this.error = result.resp.body.error.message;
      this.trackItems = [];
    } else if (Array.isArray(result?.result?.items)) {
      this.trackItems = result.result.items.map(
        item => new TrackItem(item)
      );
    } else {
      try {
        this.unexpectedError = JSON.stringify(result);
      } catch (e) {
        this.unexpectedError = String(result);
      }
    }
  };
}

export default AlbumRepo;
