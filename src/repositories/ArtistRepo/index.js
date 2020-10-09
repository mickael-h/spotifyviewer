import { action, configure, observable } from 'mobx';
import AlbumItem from '../models/AlbumItem';
import Spotify from '../remote-data-sources/Spotify';

configure({ enforceActions: 'observed' });

class ArtistRepo {
  @observable
  error = null;

  @observable
  unexpectedError = null;

  @observable
  artistItem = null;

  @observable
  albumItems = [];

  @action
  setArtist = async artistItem => {
    if (artistItem == this.artistItem) {
      return;
    }
    this.artistItem = artistItem;
    await this.fetchArtistInfo();
  };

  @action
  fetchArtistInfo = async () => {
    const queryResult = await Spotify.sendArtistAlbumsQuery(this.artistItem.id);
    this.interpretArtistQueryResult(queryResult);
  };

  @action
  interpretArtistQueryResult = result => {
    if (result?.resp?.body?.error?.message != null) {
      this.error = result.resp.body.error.message;
      this.albumItems = [];
    } else if (Array.isArray(result?.result?.items)) {
      this.albumItems = result.result.items.map(
        item => new AlbumItem(item)
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

export default ArtistRepo;
