import React from 'react';
import { Avatar, ListItem } from 'react-native-elements';

const ArtistItemView = props => {
  const item = props.artistItem;

  const render = () => {
    const CHEVRON_SIZE = 50;
    return (
      <ListItem bottomDivider onPress={goToArtistScreen}>
        {renderAvatar()}
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.genres}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron size={CHEVRON_SIZE} />
      </ListItem>
    );
  };

  const goToArtistScreen = () => {
    props.navigation.navigate('Artist', { artistItem: item });
  };

  const renderAvatar = () => {
    if ((item?.images?.length ?? 0) > 0) {
      return (
        <Avatar source={{ uri: item.images[0].url }} size='medium' />
      );
    } else {
      return null;
    }
  };

  return render();
};

export default ArtistItemView;
