import { configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });

class TrackItem {
  @observable
  name;

  @observable
  id;

  @observable
  previewUrl;

  @observable
  trackNumber;

  constructor(json) {
    this.id = json?.id;
    this.name = json?.name;
    this.previewUrl = json?.preview_url;
    this.trackNumber = json?.track_number;
  }
}

export default TrackItem;
