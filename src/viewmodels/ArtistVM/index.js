import { action, configure, observable } from 'mobx';
import ArtistRepo from '../../repositories/ArtistRepo';

configure({ enforceActions: 'observed' });

class ArtistVM {
  @observable
  artistRepo = new ArtistRepo();

  @action
  setArtist = artist => {
    this.artistRepo.setArtist(artist);
  };
}

export default ArtistVM;
