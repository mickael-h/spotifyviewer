import { configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });

class AlbumItem {
  @observable
  artists;

  @observable
  id;

  @observable
  images;

  @observable
  name;

  constructor(json) {
    this.artists = (Array.isArray(json?.artists) ? json.artists : []).map(
      artist => artist?.name
    );
    this.id = json?.id;
    this.name = json?.name;
    this.images = getImagesSortedBySize(json?.images);
  }
}

const getImagesSortedBySize = images => {
  if (Array.isArray(images)) {
    return images.sort((a, b) => {
      const sizeA = Math.max(a?.width ?? 0, a?.height ?? 0);
      const sizeB = Math.max(b?.width ?? 0, b?.height ?? 0);
      return sizeA - sizeB;
    });
  } else {
    return [];
  }
};

export default AlbumItem;
