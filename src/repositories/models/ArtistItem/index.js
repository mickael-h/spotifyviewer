import { configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });

class ArtistItem {
  @observable
  id;

  @observable
  nbFollowers;

  @observable
  genres;

  @observable
  images;

  @observable
  name;

  @observable
  popularity;

  constructor(json) {
    this.id = json?.id;
    this.nbFollowers = json?.followers?.total;
    this.genres = json?.genres;
    this.name = json?.name;
    this.popularity = json?.popularity;
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

export default ArtistItem;
