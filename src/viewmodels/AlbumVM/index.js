import { action, configure, observable } from 'mobx';
import AlbumRepo from '../../repositories/AlbumRepo';
import SoundPlayer from 'react-native-sound-player';

configure({ enforceActions: 'observed' });

class AlbumVM {
  @observable
  albumRepo = new AlbumRepo();

  @action
  setAlbum = album => {
    this.albumRepo.setAlbum(album);
  };

  @action
  playTrack = trackItem => {
    this.albumRepo.setPlayingId(trackItem.id);
    try {
      SoundPlayer.playUrl(trackItem.previewUrl);
    } catch (e) {
      console.log(`cannot play the track`, e);
    }
  };

  @action
  stopPlaying = () => {
    SoundPlayer.pause();
    this.albumRepo.setPlayingId(null);
  };
}

export default AlbumVM;
