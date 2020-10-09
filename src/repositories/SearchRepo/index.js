import { action, configure, observable } from 'mobx';
import AlbumItem from '../models/AlbumItem';
import ArtistItem from '../models/ArtistItem';
import SearchQuery from '../models/SearchQuery';
import Spotify from '../remote-data-sources/Spotify';

configure({ enforceActions: 'observed' });

class SearchRepo {
  @observable
  searchQuery = new SearchQuery();

  @observable
  error = null;

  @observable
  unexpectedError = null;

  @observable
  artistItems = [];

  @observable
  newReleasesItems = [];

  @action
  refreshQuery = async () => {
    await this.sendQuery(this.searchQuery.savedQuery);
  };

  @action
  setQuery = queryStr => {
    this.searchQuery.setQuery(queryStr);
  };

  @action
  fetchNewReleases = async () => {
    const queryResult = await Spotify.sendNewReleasesQuery();
    this.interpretReleasesQueryResult(queryResult);
  };

  @action
  sendCurrentQuery = async () => {
    this.searchQuery.saveQuery();
    await this.sendQuery(this.searchQuery.currentQuery);
  };

  @action
  sendQuery = async queryStr => {
    const queryResult = await Spotify.sendSearchQuery(queryStr);
    this.searchQuery.setResult(queryResult);
    this.interpretSearchQueryResult(queryResult);
  };

  @action
  interpretSearchQueryResult = result => {
    if (result?.resp?.body?.error?.message != null) {
      this.error = result.resp.body.error.message;
      this.artistItems = [];
    } else if (Array.isArray(result?.result?.artists?.items)) {
      this.artistItems = result.result.artists.items.map(
        item => new ArtistItem(item)
      );
    } else {
      try {
        this.unexpectedError = JSON.stringify(result);
      } catch (e) {
        this.unexpectedError = String(result);
      }
    }
  };

  @action
  interpretReleasesQueryResult = result => {
    if (result?.resp?.body?.error?.message != null) {
      this.error = result.resp.body.error.message;
      this.newReleasesItems = [];
    } else if (Array.isArray(result?.result?.albums?.items)) {
      this.newReleasesItems = result.result.albums.items.map(
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

export default SearchRepo;
